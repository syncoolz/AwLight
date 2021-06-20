
class botz {
    async MonitorRealtime() {
        const timerMonitorRealtime = new TaskTimer(1000);
        timerMonitorRealtime.add([
            {
                id: 'MonitorRealtime',       // unique ID of the task                
                tickInterval: 10,   // run every 10 ticks (10 x interval = 10000 ms)
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
                        document.getElementById("CpuPercentText").innerHTML = CPU_Percent_raw.toFixed(0) + " %";
                        document.getElementById("RamPercentText").innerHTML = RAM_Percent_raw.toFixed(0) + " %";
                        document.getElementById("NetPercentText").innerHTML = NET_Percent_raw.toFixed(0) + " %";
                    }
                    countMonitorRealtime()
                }
            }, {
                id: 'AI_DetectError',       // unique ID of the task                
                tickInterval: 300,   // run every 10 ticks (10 x interval = 10000 ms)
                totalRuns: 0,       // run 2 times only. (set to 0 for unlimited times)
                callback(task) {
                    console.log(`${task.id} START.`);
                    loginzz.detectError()
                }
            }
        ]);
        timerMonitorRealtime.start()
    }
    async CheckingMinings() {
        const waitStatus = "Mining";
        if (document.getElementById('AutoRestartFunction').checked == true) {
            const timeleft = document.getElementById('MinedOuttime').value
            const countCheckMining = parseFloat(timeleft)
            if (waitStatus == document.getElementById("text-cooldown").innerHTML) {
                /*    Swal.fire({
                        icon: 'success',
                        title: 'The system is mining',
                        html: 'If you spend more than ' + + document.getElementById('MinedOuttime').value + ' seconds mining, the system will reset automatically.',
                        showConfirmButton: false,
                        timer: 5000
                    }) */
                bott.appendMessage(`Restart when it takes more than ${timeleft} sec.)`)
                const timerMiningCheck = new TaskTimer(1000);
                timerMiningCheck.add([
                    {
                        id: 'MiningCheck',       // unique ID of the task
                        //tickDelay: 1,       // 1 tick delay before first run
                        tickInterval: countCheckMining,   // run every 10 ticks (10 x interval = 10000 ms)
                        totalRuns: countCheckMining,       // run 2 times only. (set to 0 for unlimited times)
                        callback(task) {
                            console.log(`${task.id} task has run ${task.currentRuns} times.`);
                            if (waitStatus == document.getElementById("text-cooldown").innerHTML) {
                                timerMiningCheck.stop()
                                location.reload();
                            } else {
                                timerMiningCheck.stop()
                            }
                        }
                    },
                    {
                        id: 'countMiningCheck',       // unique ID of the task
                        tickInterval: 1,    // run every 5 ticks (5 x interval = 5000 ms)
                        totalRuns: countCheckMining,      // run 10 times only. (set to 0 for unlimited times)
                        callback(task) {
                            //console.log(`${task.id} task has run ${count} times.`);
                            document.getElementsByTagName('title')[0].text = `Mining.. ${Math.ceil(task.totalRuns - task.currentRuns)} Sec`
                            if (waitStatus != document.getElementById("text-cooldown").innerHTML) {
                                timerMiningCheck.stop()
                                loginzz.detectError()
                            }
                        }
                    }
                ]);
                timerMiningCheck.start()
            }
        }
    }
}