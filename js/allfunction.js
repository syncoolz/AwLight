class allfunction {    
    async MoreInfoAll() {
        this.infoWax()
        this.infoTlm()
        this.infoStake()
        //this.SetBagInfo()
        //this.SetLandInfo()
        bott.appendMessage("Check More All Information")
    }

    async infoTlm() {        
            const balancez = await getBalance(wax.userAccount, wax.api.rpc);
            document.getElementById("info-tlm-balance").innerHTML = balancez
            document.getElementById("text-balance").innerHTML = balancez
            return balancez
    }

    async Cpu_fix() {
        let accountDetail = await this.postData('https://wax.cryptolions.io/v2/state/get_account?account=' + wax.userAccount, {}, 'GET')
        accountDetail = accountDetail.account;
        let id_cpu = ((accountDetail.cpu_limit.used / accountDetail.cpu_limit.max) * 100).toFixed(2) + " CPU"
        if (accountDetail) {
            document.getElementById("text-balance-cpu").innerHTML = id_cpu

        }
    }

    async infoWax() {
        let accountDetail = await bott.postData('https://wax.cryptolions.io/v2/state/get_account?account=' + wax.userAccount, {}, 'GET')
        if (accountDetail) {
            for (let token of accountDetail.tokens) {
                if (token.symbol === "WAX") {
                    let balanceWax = token.amount
                    document.getElementById("info-wax-transfer").innerHTML = balanceWax.toFixed(4) + " WAX"
                    return balanceWax.toFixed(4)
                }
            }
        }
    }

    async infoStake() {
        let accountDetail = await bott.postData('https://wax.pink.gg/v1/chain/get_account', { account_name: wax.userAccount }, 'POST')
        let id_stacks = parseFloat(accountDetail.total_resources.cpu_weight).toFixed(4).toString() + " WAX"
        if (accountDetail) {
            document.getElementById("info-stake-balance").innerHTML = id_stacks

        }
    }

    async SetBagInfo() {
        const body = {
            "json": true,
            "code": "m.federation",
            "scope": "m.federation",
            "table": "bags",
            "lower_bound": wax.userAccount,
            "upper_bound": wax.userAccount,
        }
        const gg = await bott.postData('https://wax.pink.gg/v1/chain/get_table_rows', body, 'POST')
        let i = 0;
        for (const item of gg.rows[0].items) {
            const qq = await bott.postData('https://wax.api.atomicassets.io/atomicassets/v1/assets/' + item, {}, 'GET')
            console.log("get pic bags");

            //document.getElementById("item"+i)[0].setAttribute("src", 'https://ipfs.io/ipfs/'+qq.data.data.img);
            // ocument.getElementsById("item"+i)[0].src = 'https://ipfs.io/ipfs/'+qq.data.data.img;
            document.getElementById("BagImage" + i).src = 'https://ipfs.io/ipfs/' + qq.data.data.img; 
            document.getElementById("BagAsset" + i).innerHTML = item           
            i++;
        }
        let accountDetail = await bott.postData('https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=alien.worlds&owner=' + wax.userAccount + '&limit=100&schema_name=tool.worlds', {}, 'GET')
        if (accountDetail) {
            let i = 0;
            let selectBag = ''
            for (let token of accountDetail.data) {                
                selectBag += `<option value="${token.asset_id}"> ${token.asset_id} - ${token.name}</option>`                                  
                i++;
            }                  
            document.getElementById("select_set_bag_1").insertAdjacentHTML('beforeend',selectBag)
            document.getElementById("select_set_bag_2").insertAdjacentHTML('beforeend',selectBag)
            document.getElementById("select_set_bag_3").insertAdjacentHTML('beforeend',selectBag)
        }       
    }

    async SetLandInfo() {
        const body = {
            "json": true,
            "code": "m.federation",
            "scope": "m.federation",
            "table": "miners",
            "lower_bound": wax.userAccount,
            "upper_bound": wax.userAccount,
        }
        const gg = await bott.postData('https://wax.pink.gg/v1/chain/get_table_rows', body, 'POST')
        const token = gg.rows[0].current_land
        var toton_number = token
        console.log(toton_number.toString(13));
        const qq = await bott.postData('https://wax.api.atomicassets.io/atomicassets/v1/assets/' + toton_number, {}, 'GET')
        console.log("get pic bags");

        //document.getElementById("item"+i)[0].setAttribute("src", 'https://ipfs.io/ipfs/'+qq.data.data.img);
        // ocument.getElementsById("item"+i)[0].src = 'https://ipfs.io/ipfs/'+qq.data.data.img;
        document.getElementById("LandImage").src = 'https://ipfs.io/ipfs/' + qq.data.data.img;
        document.getElementById("text-commission").innerHTML = (qq.data.data.commission * 0.01).toFixed(2)
        document.getElementById("text-id-land").innerHTML = qq.data.asset_id
    }
}