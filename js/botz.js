class botz {
    constructor() {
        this.countcheckstop = false;
        this.subtractDays = 0;
        this.pushAmount = [];
        this.selectpush = [];
        this.cpuAvailable = 0;
        this.cpuCheckSleep = 0;        
        this.CancelcpuCheckSleep = 0;
    }

    async getTlmperDate(amountTlm) {
        let getAmount = {
            day: moment().format('DD-MM'),
            tlm: parseFloat(amountTlm).toFixed(4),
        };
        this.pushAmount.push(getAmount);
        await this.filterTlmperDate();
    }
    async filterTlmperDate() {
        let filterAmount = [];
        const date3 = moment().subtract(3, "days").format("DD-MM");
        filterAmount = this.pushAmount.filter((result) => { return result.day !== date3; });
        //console.log(filterAmount)
        this.pushAmount = filterAmount;
        for (let i = 0; i < 3; i++) {
            let ans = 0;
            const datenow = moment().subtract(i, "days").format("DD-MM");
            filterAmount = this.pushAmount.filter((result) => { return result.day === datenow; });
            if (filterAmount.length) {
                filterAmount.forEach((filterAmount) => {
                    ans += parseFloat(filterAmount.tlm)
                })
                console.log('Tlm All per Days = ' + ans);
                if (i == 0) {
                    document.getElementById("tlmperDays" + i).innerHTML = `TODAY : [ ${parseFloat(ans).toFixed(3)} TLM (${filterAmount.length}) ]`
                } else {
                    document.getElementById("tlmperDays" + i).innerHTML = `${datenow} : [ ${parseFloat(ans).toFixed(3)} TLM (${filterAmount.length}) ]`
                }
            } else {
                console.log('No Data')
            }
        }
        saveConfig()
    }

    async MonitorRealtime() {
        const timerMonitorRealtime = new TaskTimer(1000);
        timerMonitorRealtime.add([
            {
                id: 'MonitorRealtime',       // unique ID of the task                
                tickInterval: 300,   // run every 10 ticks (10 x interval = 10000 ms)
                totalRuns: 0,       // run 2 times only. (set to 0 for unlimited times)
                callback(task) {
                    console.log(`${task.id} CPU Checking.`);
                    async function countMonitorRealtime() {
                        const userAccount = document.getElementById("text-user").innerHTML
                        var account_data = await wax.api.rpc.get_account(userAccount);
                        const CPU_Percent_raw = Number(((account_data.cpu_limit.used / account_data.cpu_limit.max) * 100).toFixed(2))
                        const NET_Percent_raw = Number(((account_data.net_limit.used / account_data.net_limit.max) * 100).toFixed(2))
                        const RAM_Percent_raw = Number(((account_data.ram_usage / account_data.ram_quota) * 100).toFixed(2))
                        document.getElementById("CpuPercentProgress").value = CPU_Percent_raw.toFixed(0);
                        document.getElementById("RamPercentProgress").value = RAM_Percent_raw.toFixed(0);
                        document.getElementById("NetPercentProgress").value = NET_Percent_raw.toFixed(0);
                        document.getElementById("CpuPercentText").innerHTML = `CPU Used : ${CPU_Percent_raw.toFixed(0)}% ( ${Number((account_data.cpu_limit.used / 1000).toFixed(2))} ms / ${Number((account_data.cpu_limit.max / 1000).toFixed(2))} ms ) - (Available : ${Number((account_data.cpu_limit.available / 1000).toFixed(2))} ms )`
                        document.getElementById("RamPercentText").innerHTML = `RAM Used : ${RAM_Percent_raw.toFixed(0)}%`
                        document.getElementById("NetPercentText").innerHTML = `NET Used : ${NET_Percent_raw.toFixed(0)}%`
                        botzz.cpuAvailable = Number(account_data.cpu_limit.available);
                        
                        if (document.getElementById("auto-sleepmode").checked == true) {
                            if (CPU_Percent_raw.toFixed(0) > 97) {
                                botzz.cpuCheckSleep++
                                botzz.CancelcpuCheckSleep = 0;
                                bott.appendMessage(`Status : Count for Sleep Mode [${botzz.cpuCheckSleep}/240]`)
                                console.log(botzz.cpuCheckSleep)
                                if (botzz.cpuCheckSleep == 240) {
                                    botzz.cpuCheckSleep = 0;
                                    bott.appendMessage(`Status : Use sleep mode wait for 4 hour`)
                                    timerMonitorRealtime.stop()
                                    botzz.Sleeping()
                                }
                            }else {
                                botzz.CancelcpuCheckSleep++
                                if (botzz.CancelcpuCheckSleep == 120){
                                    botzz.CancelcpuCheckSleep = 0;
                                    botzz.cpuCheckSleep = 0;
                                }
                            }
                        }
                    }
                    countMonitorRealtime()
                }
            }
        ]);
        timerMonitorRealtime.start()
    }

    async countdownReload() {
        botzz.countcheckstop = false;
        if (document.getElementById('AutoRestartFunction').checked == true) {
            const timeleft = document.getElementById('MinedOuttime').value
            const countCheckMining = parseFloat(timeleft)
            bott.appendMessage(`Status : When takes too long ${timeleft} sec. (Auto reload)`)
            const timerMiningCheck = new TaskTimer(1000);
            timerMiningCheck.add([
                {
                    id: 'ReloadCheckPoint',       // unique ID of the task
                    //tickDelay: 1,       // 1 tick delay before first run
                    tickInterval: countCheckMining,   // run every 10 ticks (10 x interval = 10000 ms)
                    totalRuns: 1,       // run 2 times only. (set to 0 for unlimited times)
                    callback(task) {
                        console.log(`${task.id} task has run ${task.currentRuns} times.`);
                        if (botzz.countcheckstop == false) {
                            location.reload();
                        } else {
                            timerMiningCheck.stop()
                        }
                    }
                },
                {
                    id: 'countdownReload',       // unique ID of the task
                    tickInterval: 1,    // run every 5 ticks (5 x interval = 5000 ms)
                    totalRuns: countCheckMining,      // run 10 times only. (set to 0 for unlimited times)
                    callback(task) {
                        //console.log(`${task.id} task has run ${count} times.`);
                        document.getElementsByTagName('title')[0].text = `Countdown.. ${Math.ceil(task.totalRuns - task.currentRuns)} Sec`
                        if (botzz.countcheckstop == true) {
                            timerMiningCheck.stop()
                        }
                    }
                }
            ]);
            timerMiningCheck.start()
        }
    }
    async Sleeping() {
        botzz.cpuCheckSleep = 0;
        botzz.countcheckstop = true;
        bott.counttimestop = true;
        const timerCountSleep = new TaskTimer(1000);
        timerCountSleep.add([
            {
                id: 'Sleeping',       // unique ID of the task                
                tickInterval: 1,   // run every 10 ticks (10 x interval = 10000 ms)
                totalRuns: 14400,       // run 2 times only. (set to 0 for unlimited times)
                callback(task) {
                    async function Sleepz() {
                        document.getElementById("text-cooldown").innerHTML = `Sleep Mode - ${Math.ceil(task.totalRuns - task.currentRuns)} Sec`
                        document.getElementsByTagName('title')[0].text = `Sleep Mode - ${Math.ceil(task.totalRuns - task.currentRuns)} Sec`
                        botzz.cpuCheckSleep = 0;
                        bott.counttimestop = true;
                    }
                    Sleepz()
                }
            },
            {
                id: 'Awake',       // unique ID of the task                
                tickInterval: 14400,   // run every 10 ticks (10 x interval = 10000 ms)
                totalRuns: 14400,       // run 2 times only. (set to 0 for unlimited times)
                callback(task) {
                    console.log(`System status : ${task.id}`);
                    timerCountSleep.reset()
                    async function Awake() {
                        botzz.MonitorRealtime();
                        await Promise.all([bott.mine(), botzz.countdownReload()]);
                    }
                    Awake()
                }
            }
        ]);
        timerCountSleep.start()
    }

}
