class loginz {
    constructor() {
        this.intervalDetect;
        this.loginintervalz;
        this.loginauto = false;
    }

    async getRandomTimeout() {
        var baseTimeout = 10000 * Math.random();
        var randTimeout = Math.random() * 28000 + baseTimeout;
        return randTimeout
    }

    async autologinz() {
        function getRandomTimeout() {
            var baseTimeout = 30000 * Math.random();
            var randTimeout = Math.random() * 10000 + baseTimeout;
            return randTimeout
        }
        const timerandom = parseFloat((getRandomTimeout() / 1000) * 2).toFixed(0);
        console.log(`timerandom ${timerandom} times.`);
        const count = parseFloat(timerandom)
        const timerlogin = new TaskTimer(1000);
        timerlogin.add([
            {
                id: 'Login',       // unique ID of the task
                //tickDelay: 1,       // 1 tick delay before first run
                tickInterval: count,   // run every 10 ticks (10 x interval = 10000 ms)
                totalRuns: count,       // run 2 times only. (set to 0 for unlimited times)
                callback(task) {
                    timerlogin.reset();
                    console.log(`${task.id} task has run ${task.currentRuns} times.`);
                    document.getElementById("btn-controller").innerHTML = "Good lucks";
                    document.getElementsByTagName('title')[0].text = `AwLight - Good lucks`
                    async function loginNow() {
                        await bott.start()
                    }
                    loginNow()
                }
            },
            {
                id: 'countLogin',       // unique ID of the task
                tickInterval: 1,    // run every 5 ticks (5 x interval = 5000 ms)
                totalRuns: count,      // run 10 times only. (set to 0 for unlimited times)
                callback(task) {
                    console.log(`${task.id} task has run ${count} times.`);
                    if (loginzz.loginauto == true) {
                        document.getElementById("btn-controller").innerHTML = "System login Automatic in.. " + Math.ceil(task.totalRuns - task.currentRuns) + " Sec"
                        document.getElementsByTagName('title')[0].text = `AwLight - Start in.. ${Math.ceil(task.totalRuns - task.currentRuns)} Sec`
                    } else {
                        timerlogin.stop();
                        console.log(`${task.id} Reset Time.`);
                    }
                    if (document.getElementById('AutoLogin').checked == true) {
                        loginzz.loginauto = true
                    } else {
                        timerlogin.stop();
                        loginzz.loginauto = false
                    }
                    
                }
            }
        ]);
        timerlogin.start()
    }
    async detectError() {
        /*Swal.fire({
            icon: 'success',
            title: 'Auto Check Error',
            html: 'Processing...',
            showConfirmButton: false,
            timer: 2500
        })*/
        let errloggerText = document.getElementById("box-message").value;
        let match = errloggerText.match('Get Time Mining') || [];
        let match1 = errloggerText.match('Mine too soon') || [];
        const errChecking = "Get Time Mining";
        const errChecking1 = "Mine too soon";
        const errCheckNaN = "NaN Sec";
        const errChecklogin = "Good lucks";
        var errCheckloginAgain = document.getElementById("btn-controller").innerHTML;
        //const errCheckTxtCooldownMining = "Mining";
        var errCheckTxtCooldown = document.getElementById("text-cooldown").innerHTML;
        if (errChecking == match) {
            Swal.fire({
                icon: 'error',
                title: 'Restart...',
                html: 'Detected Error! Get Time Mining',// + br + '• แก้ไข Transaction ลดปัญหาการติด  User Declined' + br + '• ลดระยะเวลายกเลิกหน้า CAPTCHA ลงเหลือ 70 วินาที ' + br + '• อัพเดท AutoClick v.1.1 ',
                showConfirmButton: false,
                timer: 2500
            })
            setTimeout(function () {
                window.location.reload();
            }, 3000);
        } else {
            //console.log('Dont Err Get Time Mining')
        }

        if (errChecking1 == match1) {
            Swal.fire({
                icon: 'error',
                title: 'Restart...',
                html: 'Detected Error! Mine too soon',
                showConfirmButton: false,
                timer: 2500
            })
            setTimeout(function () {
                window.location.reload();
            }, 3000);
        } else {
            //console.log('Dont Err Mine too soon')
        }

        if (errCheckNaN == errCheckTxtCooldown) {
            Swal.fire({
                icon: 'error',
                title: 'Restart...',
                html: 'Detected Error! NaN Sec',
                showConfirmButton: false,
                timer: 2500
            })
            setTimeout(async function () {
                window.location.reload();
            }, 3000);
        } else {
            //console.log('Dont Err NaN')
        }

        if (errChecklogin == errCheckloginAgain) {
            setTimeout(async function () {
                if (errChecklogin == errCheckloginAgain) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Detected time error!',
                        html: 'Automatically Reload.',
                        showConfirmButton: false,
                        timer: 2500
                    })
                    setTimeout(async function () {
                        window.location.reload();
                    }, 3000);
                }
            }, 30000);
        } else {
            //console.log('Dont Err Mining')
        }

        /*    if (errCheckTxtCooldownMining == errCheckTxtCooldown) {
                
                setTimeout(async function () {
                    if (errCheckTxtCooldownMining == errCheckTxtCooldown) {
                        Swal.fire({
                            icon: 'info',
                            title: 'Detected time error!',
                            html: 'Automatically retrieve new time successfully.' + errCheckTxtCooldown,
                            showConfirmButton: false,
                            timer: 2500
                        })
                        setTimeout(async function () {
                            window.location.reload();
                        }, 3000);
                    }
                }, 80000);
            } else {
                //console.log('Dont Err Mining')
            }
        */
        /*async autoDetectError() {
         const timerDetectError = new TaskTimer(1000);
         timerDetectError.add([            
             {
                 id: 'AI_DetectError',       // unique ID of the task                
                 tickInterval: 300,   // run every 10 ticks (10 x interval = 10000 ms)
                 totalRuns: 0,       // run 2 times only. (set to 0 for unlimited times)
                 callback(task) {                    
                     console.log(`${task.id} START.`);
                     loginzz.detectError()
                 }
             }
         ]);
         timerDetectError.start()        
     }*/
    }

}