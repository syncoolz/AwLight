class allfunction {
    constructor() {
        this.Maxwaxs = '';        
      }

    async MoreInfoAll() {
        this.infoWax()
        this.infoTlm()
        this.infoStake()
        bott.appendMessage("Check More All Information")
    }

    async maxtlm() {
        console.log('max')
        document.getElementById("text_swap_tlm").value = parseFloat(document.getElementById("info-tlm-balance").innerHTML)
    }

    async maxwax() {
        console.log('max')
        document.getElementById("text_stake_cpu").value = Math.trunc(this.Maxwaxs);
    }

    async maxTransfer() {
        console.log('max')
        document.getElementById("text_tranfer_wax").value = parseFloat(document.getElementById("info-wax-transfer").innerHTML)
    }

    async infoTlm() {
        document.getElementById("info-tlm-balance").innerHTML = "Please Wait.."
        const balancez = await getBalance(wax.userAccount, wax.api.rpc);
        document.getElementById("info-tlm-balance").innerHTML = balancez
        document.getElementById("text-balance").innerHTML = `TLM Total : ${parseFloat(balancez).toFixed(4)} Tlm`
        return balancez
    }

    async infoWax() {
        document.getElementById("info-wax-transfer").innerHTML = "Please Wait.."
        let accountDetail = await bott.postData('https://wax.pink.gg/v1/chain/get_account', { account_name: wax.userAccount }, 'POST')
        if (accountDetail) {
            document.getElementById("info-wax-transfer").innerHTML = parseFloat(accountDetail.core_liquid_balance).toFixed(4).toString() + " WAX"        
        }
    }

    async infoStake() {
        document.getElementById("info-stake-balance").innerHTML = "Please Wait.."
        let accountDetails = await bott.postData('https://wax.pink.gg/v1/chain/get_account', { account_name: wax.userAccount }, 'POST')
        let id_stacks = "[ You have staked : " + parseFloat(accountDetails.total_resources.cpu_weight).toFixed(4).toString() + " Wax ] | [ Balance : " + parseFloat(accountDetails.core_liquid_balance).toFixed(4).toString() + " Wax ]";
        this.Maxwaxs = parseFloat(accountDetails.core_liquid_balance).toFixed(4).toString()
        if (accountDetails) {
            document.getElementById("info-stake-balance").innerHTML = id_stacks
        }
    }

    async SetBagInfo() {
        let accountDetail = await bott.postData(atomic_endpoint[getRandom(0,atomic_endpoint.length)] + '/atomicassets/v1/assets?collection_name=alien.worlds&owner=' + wax.userAccount + '&limit=100&schema_name=tool.worlds', {}, 'GET')
        if (accountDetail) {
            let i = 0;
            let selectBag = ''
            for (let token of accountDetail.data) {
                selectBag += `<option value="${token.asset_id}"> ${token.asset_id} - ${token.name}</option>`
                i++;
            }
            document.getElementById("select_set_bag_1").insertAdjacentHTML('beforeend', selectBag)
            document.getElementById("select_set_bag_2").insertAdjacentHTML('beforeend', selectBag)
            document.getElementById("select_set_bag_3").insertAdjacentHTML('beforeend', selectBag)
        }
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
            const qq = await bott.postData(atomic_endpoint[getRandom(0,atomic_endpoint.length)] + '/atomicassets/v1/assets/' + item, {}, 'GET')
            console.log("get pic bags");
            document.getElementById("BagImage" + i).src = 'https://ipfs.io/ipfs/' + qq.data.data.img;
            document.getElementById("BagAsset" + i).innerHTML = item
            i++;
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
        const qq = await bott.postData(atomic_endpoint[getRandom(0,atomic_endpoint.length)] + '/atomicassets/v1/assets/' + toton_number, {}, 'GET')
        console.log(qq.data);
        console.log(qq.data.template.immutable_data.planet);
        bott.nameworlds = qq.data.template.immutable_data.planet;
        document.getElementById("LandImage").src = 'https://ipfs.io/ipfs/' + qq.data.data.img;
        document.getElementById("text-commission").innerHTML = (qq.data.data.commission * 0.01).toFixed(2)
        document.getElementById("text-id-land").innerHTML = qq.data.asset_id
        document.getElementById("text-id-Name").innerHTML = qq.data.data.name
        document.getElementById("text-id-Delay").innerHTML = `x ${(qq.data.data.delay * 0.1).toFixed(1)} Multiplier`
        document.getElementById("text-id-Ease-Diff-Luck").innerHTML = `${(qq.data.data.ease * 0.1).toFixed(1)} / ${qq.data.data.difficulty} / ${(qq.data.data.luck * 0.1).toFixed(1)}`
        document.getElementById("text-id-LocationXY").innerHTML = `X : ${qq.data.data.x} / Y : ${qq.data.data.y}`
    }
    
    async f_get_bags() {
        try {
            bott.appendMessage(`Status : Fatching tools.`, 1)
            let accountDetail = await bott.postData(atomic_endpoint[getRandom(0,atomic_endpoint.length)] + '/atomicassets/v1/assets?collection_name=alien.worlds&owner=' + wax.userAccount + '&limit=100&schema_name=tool.worlds', {}, 'GET')
            console.log(accountDetail)
            if (accountDetail) {
                let i = 0;
                let selectBag = ''
                let selectall = []
                for (let token of accountDetail.data) {
                    selectall.push({ asset_ids: token.asset_id });
                    selectBag += `<option value="${token.asset_id}"> ${token.asset_id} - ${token.name}</option>`
                    i++;
                }
                botzz.selectpush = selectall;
                //console.log(botzz.selectpush)
                document.getElementById("select_bag_4").insertAdjacentHTML('beforeend', `<option value="0">[-- Auto Select All Tools --]</option>`)
                document.getElementById("select_bag_4").insertAdjacentHTML('beforeend', `<option value="1">[-- Auto Select All Tools & -1 Tools (For Mine) --]</option>`)
                document.getElementById("select_bag_4").insertAdjacentHTML('beforeend', `<option value="2">[-- Auto Select All Tools & -2 Tools (For Mine) --]</option>`)
                document.getElementById("select_bag_4").insertAdjacentHTML('beforeend', `<option value="3">[-- Auto Select All Tools & -3 Tools (For Mine) --]</option>`)
                document.getElementById("select_bag_4").insertAdjacentHTML('beforeend', selectBag)
            }
            bott.appendMessage(`Status : Fatch tools success.`, 1)
        } catch (err) {
            bott.appendMessage(`Status : Fatch tools Failed.`, 1)
            bott.appendMessage(`Status : ${err}`, 1)
        }
    }

    async f_infoWax() {
        try {
            bott.appendMessage(`Status : Fatching wax.`, 1)
            document.getElementById("balance_Wax").innerHTML = "Please Wait.."
            let accountDetail = await bott.postData('https://wax.pink.gg/v1/chain/get_account', { account_name: wax.userAccount }, 'POST')
            if (accountDetail) {
                bott.appendMessage(`Status : Fatch Wax success.`, 1)
                return document.getElementById("balance_Wax").innerHTML = "You have balance = " + parseFloat(accountDetail.core_liquid_balance).toFixed(4).toString() + " WAX"
            }
        } catch (err) {
            bott.appendMessage(`Status : Fatch Wax Failed.`, 1)
            bott.appendMessage(`Status : ${err}`, 1)
        }

    }

    async f_transferItem(toAcc, items) {
        try {
            bott.appendMessage(`Status : Transfer Items in progress..`, 1)
            let select = []
            let amountItems = []
            if (document.getElementById("select_bag_4").value == 0) {
                select = botzz.selectpush.filter((result) => { return result.asset_ids; });
                select.forEach((select) => {
                    amountItems.push(select.asset_ids);
                })
            } else if (document.getElementById("select_bag_4").value == 1) {
                select = botzz.selectpush.filter((result) => { return result.asset_ids; });
                select.forEach((select) => {
                    amountItems.push(select.asset_ids);
                })
                amountItems.slice(1)
            } else if (document.getElementById("select_bag_4").value == 2) {
                select = botzz.selectpush.filter((result) => { return result.asset_ids; });
                select.forEach((select) => {
                    amountItems.push(select.asset_ids);
                })
                amountItems.slice(2)

            } else if (document.getElementById("select_bag_4").value == 3) {
                select = botzz.selectpush.filter((result) => { return result.asset_ids; });
                select.forEach((select) => {
                    amountItems.push(select.asset_ids);
                })
                amountItems.slice(3)

            } else {
                amountItems = [items]
                console.log(`${wax.userAccount} Transfering Asset ${items} to ${toAcc}...`);
            }
            console.log(amountItems)
            const transferItems = {
                'from': wax.userAccount,
                'to': toAcc,
                'asset_ids': amountItems,
                'memo': ''
            };
            const actions = [{
                'account': 'atomicassets',
                'name': 'transfer',
                'authorization': [{
                    'actor': wax.userAccount,
                    'permission': 'active'
                }],
                'data': transferItems
            }];
            const result = await wax.api.transact({ actions }, { blocksBehind: 3, expireSeconds: 90 });
            console.log(result);
            if (result && result.processed) {
                return bott.appendMessage(`Status : Transfer Items ${items} WAX To ${toAcc} Successful `, 1)
            }
        } catch (err) {
            bott.appendMessage(`Status : Transfer Failed Please try agian`, 1)
            bott.appendMessage(`Status : ${err}`, 1)
            throw err;
        }
    }

}