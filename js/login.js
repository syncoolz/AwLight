class loginz {
    constructor() {
        this.intervalDetect;
        this.loginintervalz;
        this.loginauto = false;
        this.CheckagreedTermsVersion = 2;
        this.GenerateName = ''
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
                    if (document.getElementById('AutoLogin').checked == true) {
                        async function aaa() {
                            await loginzz.funcCheckagreedTermsVersion()
                        }
                        aaa();
                    }
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
                        timerlogin.reset();
                        console.log(`${task.id} Reset Time.`);
                    }
                    if (document.getElementById('AutoLogin').checked == true) {
                        loginzz.loginauto = true
                    } else {
                        timerlogin.reset();
                        loginzz.loginauto = false
                    }

                }
            }
        ]);
        timerlogin.start()
    }

    async chooseRegisOrManage() {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-warning'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Register System',
            text: "Please choose between [ Transfer item/wax & Stake CPU ] or [ Register ]",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Register Now',
            cancelButtonText: 'Transfer Item/Wax & Stake CPU',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                loginzz.register();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                loginzz.manageFunc()
            }
        })
    }

    async manageFunc() {
        Swal.fire({
            title: `Aw-Light Transfer & Stake`,
            html: `<div class="col-12 mt-2 text-center" id="balance_Wax"></div>
            <div class="col-12 mt-2"><hr /></div>
            <div class="col-12 mt-2"><b>[---- STAKE ----]</b></div>
            <input class="col-12 mt-2 text-center" id="amount-stake" placeholder="Amount Stake CPU" value="">
            <button class="col-12 mt-2 btn btn-info" type="button" id="btn_stake" onclick="bott.stakecpu(document.getElementById('amount-stake').value)">Stake CPU</button>
            <div class="col-12 mt-2"><b>[---- Transfer TOOLS ----]</b></div>                    
            <select class="col-6 mt-2" id="select_bag_4"><option value>--- Select ---</option></select><input class="col-6 mt-2 text-center" id="input-receiver-id" placeholder="xxx.wam" value="">
            <button class="col-12 mt-2 btn btn-info" type="button" id="btn_transfer_item" onclick="allfunc.f_transferItem(document.getElementById('input-receiver-id').value, document.getElementById('select_bag_4').value)">Transfer Item</button>
            <div class="col-12 mt-2"><b>[---- Transfer WAX ----]</b></div>                    
            <input class="col-4 mt-2 text-center" id="wax-amount" placeholder="Amount Wax" value=""><input class="col-4 mt-2 text-center" id="wax-receiver-id" placeholder="xxx.wam" value=""><input class="col-4 mt-2 text-center" id="wax-receiver-memo" placeholder="memo" value="">
            <button class="col-12 mt-2 btn btn-info" type="button" id="btn_transfer_wax" onclick="bott.transfer(document.getElementById('wax-receiver-id').value, document.getElementById('wax-receiver-memo').value, document.getElementById('wax-amount').value)">Transfer Wax</button>
            <textarea id="box-message1"
            style="resize: none; background-color: var(--title-background); color: var(--font-color);"
            class="mt-2 form-control" rows="4" disabled=""></textarea>
            <button class="col-12 mt-2 btn btn-danger" type="button" id="Back" onclick="loginzz.chooseRegisOrManage()">Back</button>
            `,
            showConfirmButton: false,
        })
        bott.delay(3000)
        allfunc.f_get_bags()
        allfunc.f_infoWax()
    }

    async register() {
        console.log('Func register')
        Swal.fire({
            title: 'Set BAG and LAND first',
            html: `<div class="col-12 mt-2"><b>Please Select Tools for set Bag</b></div>
                <div class="col-12 mt-2"><select class="col-4 mt-2" id="select_bag_1"><option value>Select</option></select><select class="col-4 mt-2" id="select_bag_2"><option value>Select</option></select><select class="col-4 mt-2" id="select_bag_3"><option value>Select</option></select></div>
                <textarea id="box-message3"
            style="resize: none; background-color: var(--title-background); color: var(--font-color);"
            class="mt-2 form-control" rows="4" disabled=""></textarea>
                <div class="col-12 mt-2"><b>Please Enter Asset ID for set LAND</b></div>
                <input class="col-12 mt-2 text-center" id="Land-assetID" placeholder="Land Asset ID " value="">
                <button class="col-12 mt-2 btn btn-success" type="button" id="register" onclick="loginzz.regis(document.getElementById('Land-assetID').value)">Register Now</button>
                <button class="col-12 mt-2 btn btn-danger" type="button" id="Back" onclick="loginzz.chooseRegisOrManage()">Back</button>
                `,
            showConfirmButton: false,
        })
        loginzz.s_get_bags()
    }

    async regis(land) {
        console.log(land);
        bott.appendMessage(`Status : Start register..`, 3)
        const userAccount = document.getElementById('text-user').innerHTML
        await loginzz.s_agreeTerms(userAccount);
        await bott.delay(2000);
        const tag = await loginzz.generateString(5);
        await loginzz.s_setTagData(userAccount, tag);
        await bott.delay(2000);
        await loginzz.s_setBags()
        await bott.delay(2000);
        await bott.moveland(userAccount, land);
    }

    async funcCheckagreedTermsVersion() {
        console.log('funcCheckagreedTermsVersion')
        console.log(this.CheckagreedTermsVersion)
        if (this.CheckagreedTermsVersion == 2) {
            loginzz.loginauto = false;
            const userAccount = await wax.login();
            document.getElementById("btn-controller").hidden = true;
            if (userAccount) {
                bott.appendMessage(`Status : Login WAX Success.`)
                bott.appendMessage(`Status : Welcome ${userAccount}`)
                document.getElementById("text-user").innerHTML = userAccount
                document.getElementsByTagName('title')[0].text = userAccount
                this.CheckagreedTermsVersion = await loginzz.agreedTermsVer(userAccount);
                console.log(this.CheckagreedTermsVersion)
                if (this.CheckagreedTermsVersion == 1) {
                    return bott.loginA();
                }
                if (this.CheckagreedTermsVersion == 0) {
                    bott.appendMessage(`Status :  Please Register AlienWorlds.`)
                    return loginzz.chooseRegisOrManage();
                }
            } else {
                bott.appendMessage(`Status : Login Falsed.`)
                bott.appendMessage(`Status : Login Again in 30 sec.`)
                document.getElementById("btn-controller").hidden = false;
                await bott.delay(30000);
            }
        }
        if (this.CheckagreedTermsVersion == 1) {
            bott.loginA();
        }
        if (this.CheckagreedTermsVersion == 0) {
            loginzz.loginauto = false;
            const userAccount = await wax.login();
            document.getElementById("btn-controller").hidden = true;
            if (userAccount) {
                bott.appendMessage(`Status : Login WAX Success.`)
                bott.appendMessage(`Status : Welcome ${userAccount}`)
                document.getElementById("text-user").innerHTML = userAccount
                document.getElementsByTagName('title')[0].text = userAccount
                this.CheckagreedTermsVersion = await loginzz.agreedTermsVer(userAccount);
                console.log(this.CheckagreedTermsVersion)
                if (this.CheckagreedTermsVersion == 1) {
                    return bott.loginA();
                }
                if (this.CheckagreedTermsVersion == 0) {
                    bott.appendMessage(`Status : Please Register AlienWorlds.`)
                    return loginzz.chooseRegisOrManage();
                }
            } else {
                bott.appendMessage(`Status : Login Falsed.`)
                bott.appendMessage(`Status : Login Again in 30 sec.`)
                document.getElementById("btn-controller").hidden = false;
                await bott.delay(30000);
            }
        }
    }
    async agreedTermsVer(account) {
        try {
            var terms_id = await agreedTermsVersion(federation_account, account, wax.api.rpc);
            this.CheckagreedTermsVersion = terms_id;
            saveConfig()
            bott.appendMessage(`Status : Save agreedTermsVersion Success.`);
            return this.CheckagreedTermsVersion
        } catch {
            bott.appendMessage(`Error in function agreedTermsVer`)
            await bott.errorcatch(err)
        }
    }

    async s_agreeTerms(account) {
        try {
            bott.appendMessage(`Status : AgreeTerms progress..`, 3)
            const actions = [];
            actions.push({
                account: "federation",
                name: "agreeterms",
                authorization: [{
                    actor: account,
                    permission: "active",
                }],
                data: {
                    account,
                    terms_id: 1,
                    terms_hash: "E2E07B7D7ECE0D5F95D0144B5886FF74272C9873D7DBBC79BC56F047098E43AD"
                }
            });
            const result = await wax.api.transact({ actions }, { blocksBehind: 3, expireSeconds: 90 });
            console.log(result.processed)
            if (result && result.processed) {
                bott.appendMessage(`Status : AgreeTerms successful.`, 3)
                loginzz.CheckagreedTermsVersion = await loginzz.agreedTermsVer(wax.userAccount);
                console.log(loginzz.CheckagreedTermsVersion)
            }
        } catch (err) {
            bott.appendMessage(`Error in function s_agreeTerms`, 3)
            await bott.errorcatch(err)
        }
    }

    async s_setTagData(account, tag) {
        try {
            bott.appendMessage(`Status : Set Tag progress..`, 3)
            console.log(tag)
            const actions = [];
            actions.push({
                account: "federation",
                name: "setavatar",
                authorization: [{
                    actor: account,
                    permission: "active"
                }],
                data: {
                    account,
                    avatar_id: 1
                }
            });
            actions.push({
                account: "federation",
                name: "settag",
                authorization: [{
                    actor: account,
                    permission: "active"
                }],
                data: {
                    account,
                    tag
                }
            });
            const result = await wax.api.transact({ actions }, { blocksBehind: 3, expireSeconds: 90 });
            console.log(result)
            if (result && result.processed) {
                bott.appendMessage(`Status : AgreeTerms successful.`, 3)
            }
        } catch (err) {
            bott.appendMessage(`Error in function s_setTagData`, 3)
            await bott.errorcatch(err)
        }
    }


    async s_get_bags() {
        try {
            bott.appendMessage(`Status : Fatching Tools..`, 3)
            let accountDetail = await bott.postData('https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=alien.worlds&owner=' + wax.userAccount + '&limit=100&schema_name=tool.worlds', {}, 'GET')
            if (accountDetail) {
                let i = 0;
                let selectBag = ''
                for (let token of accountDetail.data) {
                    selectBag += `<option value="${token.asset_id}"> ${token.asset_id} - ${token.name}</option>`
                    i++;
                }
                document.getElementById("select_bag_1").insertAdjacentHTML('beforeend', selectBag)
                document.getElementById("select_bag_2").insertAdjacentHTML('beforeend', selectBag)
                document.getElementById("select_bag_3").insertAdjacentHTML('beforeend', selectBag)
            }
            bott.appendMessage(`Status : Fatch Tools success..`, 3)
        } catch (err) {
            bott.appendMessage(`Status : Fatch tools Failed.`, 3)
            bott.appendMessage(`Status : ${err}`, 3)
        }
    }

    async s_setBags() {
        try {
            bott.appendMessage(`Status : Set Tools in progress..`, 3)
            let actions = [
                {
                    account: "m.federation",
                    name: "setbag",
                    authorization: [
                        {
                            actor: wax.userAccount,
                            permission: "active",
                        },
                    ],
                    data: {
                        account: wax.userAccount,
                        items: [document.getElementById("select_bag_1").value, document.getElementById("select_bag_2").value, document.getElementById("select_bag_3").value]
                    },
                },
            ];
            const result = await wax.api.transact({ actions }, { blocksBehind: 3, expireSeconds: 90 });
            if (result && result.processed) {
                bott.appendMessage(`Status :  Successful set BAG`, 3)
                return `Succsess : Change Tools = ${result.processed}`
            }
        } catch (err) {
            bott.appendMessage(`Status Error : ${err.message}`, 3)
            bott.appendMessage(`Status : Failed set Tools.`, 3)
            throw err;
        }
    }

    async generateString(length) {
        var keylist = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"
        this.GenerateName = ''
        for (i = 0; i < length; i++) {
            this.GenerateName += keylist.charAt(Math.floor(Math.random() * keylist.length))
        }
        return this.GenerateName
    }
}