
class bot {

  constructor() {    
    this.checkMinedelay = false;
    this.autoClaimnfts;
    this.waitNoceMine;
    this.TimeWait = 0;
    this.Acceptmine = false;
    this.counttimetomine = 0;
    this.counttimetoST = 0;
    this.balanceBefore;
    this.waitNoceMine = false;
    this.checkInvalid;
  }


  delay = (millis) =>
    new Promise((resolve, reject) => {
      setTimeout((_) => resolve(), millis);
    });

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  async postData(url = '', data = {}, method = 'POST', header = { 'Content-Type': 'application/json' }, returnMode = 'json') {
    try {
      // Object.assign(header,{'pragma':'no-cache' ,'cache-control':'no-cache'})
      const init = (method == 'POST') ? { method: method, mode: 'cors', cache: 'no-cache', credentials: 'same-origin', headers: header, redirect: 'follow', referrerPolicy: 'no-referrer', body: JSON.stringify(data) } : { method: method, mode: 'cors', cache: 'no-cache', credentials: 'same-origin', headers: header, redirect: 'follow', referrerPolicy: 'no-referrer' }
      if (returnMode == 'json') {
        const response = await fetch(url, init);
        return response.json(); // parses JSON response into native JavaScript objects
      } else {
        const response = await fetch(url, init).then(function (response) {
          if (response.ok) {
            return response.text();
          }

          throw new Error('Something went wrong.');
        })
          .then(function (text) {
            console.log('Request successful', text);
            return text;
          })
          .catch(function (error) {
            console.log('Request failed', error);
            return '';
          });

        return response
      }
    } catch (err) {
      this.appendMessage(`Error:${err.message}`)
      //send bypass line notify
      if (this.lineToken !== '') {
        //await this.postData(this.lineBypassUrl, { token: this.lineToken, message: `Fetch:error, User:${userAccount}, Message:${err.message}` })
      }
      return false;
    }
  }

  appendMessage(msg, box = '') {
    const dateNow = moment().format('DD/MM/YYYY H:mm:ss');
    const boxMessage = document.getElementById("box-message" + box)
    boxMessage.value += '\n' + `${dateNow} : ${msg}`
    boxMessage.scrollTop = boxMessage.scrollHeight;
  }

  async timerForMine(TimeWait) {
    // Timer with 1000ms (1 second) base interval resolution.
    const timer = new TaskTimer(1000);
    // interval can be updated anytime by setting the `timer.interval` property.
    // Add multiple tasks (at once) based on tick intervals.
    const TimeWaitz = Math.ceil(TimeWait / 1000)
    const TimeSwapAndTransfer = Math.ceil(TimeWaitz / 2)
    //console.log(`task has run ${TimeWaitz} times.`);
    timer.add([
      {
        id: 'Mining',       // unique ID of the task
        tickInterval: TimeWaitz,    // run every 5 ticks (5 x interval = 5000 ms)
        totalRuns: TimeWaitz,      // run 10 times only. (set to 0 for unlimited times)
        callback(task) {
          // code to be executed on each run
          timer.reset();
          console.log(`System ${task.id}`);
          document.getElementById("text-cooldown").innerHTML = "CPU Checked"
          document.getElementsByTagName('title')[0].text = `${wax.userAccount} - CPU Checked`
          document.getElementById("btn-mine").disabled = false
          async function CPUchecking() {
            await bott.CPUchecked();
          }
          CPUchecking();
        }
      },
      {
        id: 'Count',       // unique ID of the task
        //tickDelay: 1,       // 1 tick delay before first run
        tickInterval: 1,   // run every 10 ticks (10 x interval = 10000 ms)
        totalRuns: TimeWaitz,       // run 2 times only. (set to 0 for unlimited times)
        callback(task) {
          // code to be executed on each run   
          //console.log(`${task.id} task has run times.${Math.ceil(task.totalRuns - task.currentRuns)}`);
          document.getElementById("text-cooldown").innerHTML = Math.ceil(task.totalRuns - task.currentRuns) + " Sec"
          document.getElementsByTagName('title')[0].text = `${wax.userAccount} - ${Math.ceil(task.totalRuns - task.currentRuns)} Sec`
        }
      },
      {
        id: 'AutoSwapAndTransfer',       // unique ID of the task
        //tickDelay: 1,       // 1 tick delay before first run
        tickInterval: TimeSwapAndTransfer,   // run every 10 ticks (10 x interval = 10000 ms)
        totalRuns: TimeSwapAndTransfer,       // run 2 times only. (set to 0 for unlimited times)
        callback(task) {
          // code to be executed on each run
          async function AutoSTC() {
            console.log(`System ${task.id}`);
            await bott.AutoSwapTransferAndClaim();
          }
          if (TimeWaitz > 300) {
            bott.appendMessage(`Check mine delay > 300 sec : OK)`)
            AutoSTC()
          }
        }
      }
    ]);
    await timer.start()
  }

  async CPUchecked() {
    const CpuCheckAllTime = parseInt(document.getElementById("CpuPercentProgress").value);
    const checkCpuPercent = parseInt(document.getElementById("cpu").value)
    console.log('CPU CHECK PERCENT : '+checkCpuPercent)
    if (checkCpuPercent != 0) {
      if (CpuCheckAllTime > checkCpuPercent) {
        this.counttimetomine++
        this.appendMessage("CPU Check = " + CpuCheckAllTime + " % [NOT Passed!]")
        this.appendMessage(`Counting (${this.counttimetomine}/60)--> Mine`)
        if (this.counttimetomine == 60) {
          this.counttimetomine = 0
          this.appendMessage(`Finish Count (${this.counttimetomine}/60) Mining...`)
          await Promise.all([bott.mine(), botzz.CheckingMinings()]);
        } else {
          this.TimeWait = 10000;
          await bott.timerForMine(this.TimeWait)
        }
      } else {
        this.appendMessage("CPU Check = " + CpuCheckAllTime + " % [Passed Go Mine]")
        this.counttimetomine = 0
        await Promise.all([bott.mine(), botzz.CheckingMinings()]);
      }
    } else {
      await Promise.all([bott.mine(), botzz.CheckingMinings()]);
    }
  }

  async start() {
    try {
      loginzz.loginauto = false;
      const userAccount = await wax.login();
      document.getElementById("btn-controller").hidden = true;
      const balance = await getBalance(wax.userAccount, wax.api.rpc);
      this.balanceBefore = balance.toString();
      this.appendMessage(`Balance Before ${this.balanceBefore}`)
      document.getElementById("text-balance").innerHTML = balance
      document.getElementById("text-user").innerHTML = userAccount
      document.getElementsByTagName('title')[0].text = userAccount
      await botzz.MonitorRealtime();
      this.appendMessage(`Welcome ${userAccount}`)
      const minedelay = await getMineDelay(userAccount);
      //this.appendMessage(`Minedelay ${minedelay}`)
      this.TimeWait = Math.ceil(minedelay + 10000);
      await bott.timerForMine(this.TimeWait)

      await this.delay(3000);

      var errCheckTxtCooldownz = document.getElementById("text-cooldown").innerHTML
      const errCheckNaNz = "NaN Sec";
      if (errCheckNaNz == errCheckTxtCooldownz) {
        /*Swal.fire({
          icon: 'info',
          title: 'Auto Get time again',
          html: 'Detected Error!' + errCheckNaNz,
          showConfirmButton: false,
          timer: 2500
        })
        setTimeout(async function () {
          location.reload();
        }, 3000);*/
        location.reload();
      } else {
        console.log(`Time Fine ${errCheckTxtCooldownz}`)
        document.getElementById("btn-controller").innerHTML = "OK"
      }
    } catch (error) {
      //this.isBotRunning = false
      this.appendMessage(`Error:${error.message}`)
      console.log(`Error:${error.message}`)
      /*Swal.fire({
        icon: 'error',
        title: 'Restart...',
        html: 'Detected Error!..' + error,// + br + '• แก้ไข Transaction ลดปัญหาการติด  User Declined' + br + '• ลดระยะเวลายกเลิกหน้า CAPTCHA ลงเหลือ 70 วินาที ' + br + '• อัพเดท AutoClick v.1.1 ',
        showConfirmButton: false,
        timer: 2500
      })
      await this.delay(3000);*/
      location.reload();
    }
  }

  async mine() {
    document.getElementById("btn-mine").disabled = true
    document.getElementById("text-cooldown").innerHTML = "Mining"
    document.getElementsByTagName('title')[0].text = `${wax.userAccount} - Mining`
    this.waitNoceMine == true
    this.waitNonceReload();
    const nonce = await this.getNonce()
    let actions = [
      {
        account: "m.federation",
        name: "mine",
        authorization: [
          {
            actor: wax.userAccount,
            permission: "active",
          },
        ],
        data: {
          miner: wax.userAccount,
          nonce: nonce,
        },
      },
    ];
    try {
      const result = await wax.api.transact({ actions }, { blocksBehind: 3, expireSeconds: 90 });
      /*if (result && result.processed) {
        let mined_amount = 0;
        await result.processed.action_traces[0].inline_traces.forEach((t) => {
          if (t.act.account === 'alien.worlds' && t.act.name === 'transfer' && t.act.data.to === wax.userAccount) {
            const [amount_str] = t.act.data.quantity.split(' ');
            this.appendMessage(`Test:${t.act.data.quantity.toString()}`)
            mined_amount += parseFloat(amount_str);
          }
        });
        document.getElementById("TLMPerRound").innerHTML = mined_amount.toString() + ' TLM'
        this.appendMessage(mined_amount.toString() + ' TLM', '2')
      }*/
    } catch (error) {
      console.log(`%c[Bot] Error:${error.message}`, 'color:red');
      this.appendMessage(`Error:${error.message}`)
      Swal.fire({
        icon: 'error',
        title: 'Restart...',
        html: 'Detected Error!' + error,// + br + '• แก้ไข Transaction ลดปัญหาการติด  User Declined' + br + '• ลดระยะเวลายกเลิกหน้า CAPTCHA ลงเหลือ 70 วินาที ' + br + '• อัพเดท AutoClick v.1.1 ',
        showConfirmButton: false,
        timer: 2500
      })
      await this.delay(3000)
      window.location.reload();
    }
    await this.delay(5000);
    const userAccount = document.getElementById("text-user").innerHTML
    const minedelay = await getMineDelay(userAccount);
    this.appendMessage(`Minedelay ${minedelay}`)
    this.TimeWait = Math.ceil(minedelay + 12000);
    const errCheckNaNz = "NaN Sec";
    if (errCheckNaNz != this.TimeWait) {
      await bott.timerForMine(this.TimeWait)
      this.appendMessage(`Cooldown for ${Math.ceil(this.TimeWait / 1000)} Sec`)
      //console.log(`Time Fine ${this.TimeWait}`)         
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Auto Get time again',
        html: 'Detected Error!' + errCheckNaNz,
        showConfirmButton: false,
        timer: 2500
      })
      setTimeout(async function () {
        window.location.reload();
      }, 3000);
    }
    const afterMindedBalance = await getBalance(wax.userAccount, wax.api.rpc);
    const balanceAfter = parseFloat(afterMindedBalance)
    this.appendMessage(`Balance :${balanceAfter}`)
    const showbalanceTrue = parseFloat(balanceAfter) - parseFloat(this.balanceBefore)
    this.appendMessage(`Mine Success GET: ${parseFloat(showbalanceTrue).toFixed(4)} TLM`, '2')
    document.getElementById("TLMPerRound").innerHTML = parseFloat(showbalanceTrue).toFixed(4) + ' TLM'
    document.getElementById("text-balance").innerHTML = afterMindedBalance
    // console.log(`%c[Bot] balance (after mined): ${afterMindedBalance}`, 'color:green');    
    this.balanceBefore = afterMindedBalance
  }

  async getNonce() {
    try {
      let nonce = null;
      let message = ''
      const serverGetNonce = document.querySelector('input[name="server"]:checked').value
      if (serverGetNonce == 'ok-nonce' || serverGetNonce == 'ninjamine-vip') {
        let urlServerMine = 'https://server-mine-b7clrv20.an.gateway.dev/server_mine?' + '?wallet=' + wax.userAccount
        if (serverGetNonce == 'ninjamine-vip') {
          urlServerMine = 'https://server-mine-b7clrv20.an.gateway.dev/server_mine_vip' + '?wallet=' + wax.userAccount
        }
        if (serverGetNonce == 'ok-nonce') {
          urlServerMine = `https://mine.tlmminer.com?wallet=${wax.userAccount}&hashfail=` + (this.checkInvalid == true ? '1' : '0')
        }
        console.log('urlServerMine =', urlServerMine)
        nonce = await this.postData(urlServerMine, {}, 'GET', { Origin: "" }, 'raw')
        if (nonce == '') {
          const mine_work = await background_mine(wax.userAccount)
          nonce = mine_work.rand_str
          console.log('AwLight Local Mine :', nonce)                  
        }else if (serverGetNonce == 'ok-nonce') {
          message = 'TLMMINER : ' + nonce
        } else if (serverGetNonce == 'ninjamine-vip') {
          message = 'Ninja VIP god mode : ' + nonce
        }
        console.log(message)
      }

      if (serverGetNonce == 'AwLight' || nonce == '') {        
          /*const bagDifficulty = await getBagDifficulty(wax.userAccount);
          const landDifficulty = await getLandDifficulty(wax.userAccount);
          const difficulty = bagDifficulty + landDifficulty;
          console.log('difficulty', difficulty);

          console.log('Start AwlightSvMine = ' + Date.now());         
          const last_mine_tx = await lastMineTx(mining_account, wax.userAccount, wax.api.rpc);
          console.log('last_mine_tx = ' + last_mine_tx);
          
          let AwServerMine = 'https://xxx/mine?waxaccount='+wax.userAccount+'&difficulty='+difficulty+'&lastMineTx='+last_mine_tx
          const mine_work = await this.postData(AwServerMine, {}, 'GET', { Origin: "" }, 'raw')
          nonce = mine_work.substr(1, 16)          
          console.log('nonce = ' + nonce);*/
        
          const mine_work = await background_mine(wax.userAccount)
          nonce = mine_work.rand_str
          console.log('AwLight Local Mine : ', nonce)
          message = 'AwLight Local Mine : ' + nonce
        
      }
      this.appendMessage(`Nonce Success ${message}`)
      this.waitNoceMine = false
      return nonce;
    } catch (err) {
      this.appendMessage(`getNonce Error message : ${err.message}`)      
    }
  }

  async getNFT(account, eos_rpc, aa_api) {
    const nft_res = await eos_rpc.get_table_rows({
        code: mining_account, 
        scope: mining_account, 
        table: 'claims', 
        limit: 100,
        lower_bound: account, 
        upper_bound: account
    });
    const nft = [];
    if (nft_res.rows.length){
        const items_p = nft_res.rows[0].template_ids.map((template_id) => {
            return aa_api.getTemplate("alien.worlds",template_id)
        });
        return await Promise.all(items_p);
    }
    return nft;
}

  async getClaimnfts(mode) {
    document.getElementById("btn-claimn-nft").disabled = true    
    const get_nft = await bott.getNFT(wax.userAccount, wax.api.rpc, aa_api)
    console.log('get_nft', get_nft)
    if (get_nft.length > 0) {
      let actions = [
        {
          account: 'm.federation',
          name: 'claimnfts',
          authorization: [{
            actor: wax.userAccount,
            permission: 'active',
          }],
          data: {
            miner: wax.userAccount
          },
        }
      ];

      await wax.api.transact({ actions }, { blocksBehind: 3, expireSeconds: 90 });
      for (const item of get_nft) {
        this.appendMessage(`Get ${item.name}`, '2')
        //await this.postData(this.lineBypassUrl, { token: this.lineToken, message: `User:${wax.userAccount} , NFT Name:${item.name}` })
      }
    } else {
      if (mode !== 'auto') {
        this.appendMessage('NFTs not received', '2')
      }
    }

    document.getElementById("btn-claimn-nft").disabled = false
  }

  async swap(amount_sell, amount_get) {
    try {
      var amount_sell = (parseFloat(document.getElementById("text_swap_tlm").value) + 0.0001).toFixed(4)// + " TLM"
      var amount_get = document.getElementById("text_swap_price").value
      var actions = []
      actions.push({
        account: 'alien.worlds',
        name: 'transfer',
        authorization: [{
          actor: wax.userAccount,
          permission: 'active',
        }],
        data: {
          from: wax.userAccount,
          to: "alcordexmain",
          quantity: `${amount_sell} TLM`,
          memo: `${parseFloat(amount_get).toFixed(8)} WAX@eosio.token`
        },
      });
      const result = await wax.api.transact({ actions }, { blocksBehind: 3, expireSeconds: 1200 });
      //console.log(`%c[Bot] Swap (after swap) = ${result}`, 'color:green');
      if (result && result.processed) {
        this.appendMessage(`Swap Success`)
        /*Swal.fire({
          icon: 'success',
          title: 'Swap Success',
          html: 'You swap.. ' + amount_sell + ' TLM to.. ' + ' Waxp',
          showConfirmButton: false,
          timer: 2500
        })*/
        return `Complete Swap ${amount_sell} TLM `
      }
    } catch (error) {
      this.appendMessage(`Swap Failed`)
      /*Swal.fire({
        icon: 'error',
        title: 'Restart...',
        html: 'You Swap Failed!' + error,
        showConfirmButton: false,
        timer: 2500
      })*/
      throw error;
    }
  }

  async stakecpu(account, amount) {
    try {
      var account = document.getElementById("text-user").innerHTML
      var amount = document.getElementById("text_stake_cpu").value
      console.log(`Staking ${amount} WAX to CPU...`);
      const stake = {
        'from': account,
        'receiver': account,
        'stake_net_quantity': `0.00000000 WAX`,
        'stake_cpu_quantity': `${parseFloat(amount).toFixed(8)} WAX`,
        'transfer': false
      };
      const actions = [{
        'account': 'eosio',
        'name': 'delegatebw',
        'authorization': [{
          'actor': account,
          'permission': 'active'
        }],
        'data': stake
      }];
      let result = await wax.api.transact({
        actions,
      }, {
        blocksBehind: 3,
        expireSeconds: 90,
      });
      if (result && result.processed) {
        this.appendMessage(`Stake : ${amount} Wax Success`)
        /*Swal.fire({
          icon: 'success',
          title: 'Stake Success',
          html: 'You stake.. ' + amount + ' Wax Success',
          showConfirmButton: false,
          timer: 2500
        })*/
        return `Complete stake ${amount} WAX `
      }
      return 0;
    } catch (error) {
      this.appendMessage(`You Stake Failed`)
      /*Swal.fire({
        icon: 'error',
        title: 'Restart...',
        html: 'You Stake Failed!' + err,
        showConfirmButton: false,
        timer: 2500
      })*/
      throw error;
    }
  }

  async transfer(account, amount, toAcc, memo) {
    try {
      var account = document.getElementById("text-user").innerHTML
      var amount = document.getElementById("text_tranfer_wax").value
      var toAcc = document.getElementById("to_acc").value
      console.log(`${account} Transfering ${amount} WAX to ${toAcc} ...`);
      const transferWAX = {
        'from': account,
        'to': toAcc,
        'quantity': `${parseFloat(amount).toFixed(8)}  WAX`,
        'memo': memo
      };
      const actions = [{
        'account': 'eosio.token',
        'name': 'transfer',
        'authorization': [{
          'actor': account,
          'permission': 'active'
        }],
        'data': transferWAX
      }];
      let result = await wax.api.transact({
        actions,
      }, {
        blocksBehind: 3,
        expireSeconds: 90,
      });
      if (result && result.processed) {
        /*Swal.fire({
          icon: 'success',
          title: 'Transfer Success',
          html: 'Succsess : Transfer ' + amount + ' Wax From ' + account + ' To ' + toAcc,
          showConfirmButton: false,
          timer: 2500
        })*/
        this.appendMessage(`Succsess : Transfer ${amount} WAX From ${account} To ${toAcc}`)
        return `Transfer ${amount} WAX from ${account} to ${toAcc}`
      }
      return 0;
    } catch (error) {
      this.appendMessage(`Transfer Failed Please try agian`)
      throw error;
    }
  }

  async moveland(account, land) {
    try {
      var account = document.getElementById("text-user").innerHTML
      var land = document.getElementById("text_set_land").value
      console.log(`Move ${land} ...`);
      const landid = {
        'account': account,
        'land_id': `${parseFloat(land)}`,
      };
      const actions = [{
        'account': 'm.federation',
        'name': 'setland',
        'authorization': [{
          'actor': account,
          'permission': 'active'
        }],
        'data': landid
      }];
      let result = await wax.api.transact({
        actions,
      }, {
        blocksBehind: 3,
        expireSeconds: 90,
      });
      if (result && result.processed) {
        /*Swal.fire({
          icon: 'success',
          title: 'Move Land Success',
          html: 'Succsess : Move Land to ' + land,
          showConfirmButton: false,
          timer: 2500
        })*/
        this.appendMessage(` Succsess : Move to ID ${land} Land`)
        return `Complete Move to ID ${land} Land `
      }
      return 0;
    } catch (error) {
      this.appendMessage(`Move Land Failed Please try agian`)
      throw error;
    }
  }

  async setBags() {
    try {
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
            items: [document.getElementById("select_set_bag_1").value, document.getElementById("select_set_bag_2").value, document.getElementById("select_set_bag_3").value]
          },
        },
      ];
      const result = await wax.api.transact({ actions }, { blocksBehind: 3, expireSeconds: 90 });
      if (result && result.processed) {
        /*Swal.fire({
          icon: 'success',
          title: 'Move Land Success',
          html: 'Succsess : Change Tools : ' + result.processed,
          showConfirmButton: false,
          timer: 2500
        })*/
        this.appendMessage(` Succsess : Change Tools : ${result.processed}`)
        return `Succsess : Change Tools : ${result.processed} `
      }
    } catch (error) {
      this.appendMessage(`Change Tools Failed Please try agian`)
      throw error;
    }
  }

  async AutoSwapTransferAndClaim() {
    this.counttimetoST++
    bott.appendMessage(`Count (${this.counttimetoST}/5) to Claims&Swap-Transfer(Auto)`)
    if (this.counttimetoST == 5) {
      this.counttimetoST = 0;
      const CpuChecks = parseInt(document.getElementById("CpuPercentProgress").value);
      const CpuPercentfix = parseInt(document.getElementById("cpu").value)
      if (CpuChecks < CpuPercentfix) {
        bott.appendMessage(`Normal CPU : ${CpuChecks}%`)
        const BalanceTLM = parseFloat(document.getElementById("text-balance").innerHTML).toFixed(4)
        const amountToST = parseFloat(document.getElementById("amountToST").innerHTML)
        if (BalanceTLM > amountToST) {
          if (document.getElementById('auto-SwapTransfer').checked == true) {
            bott.appendMessage(`Start Auto Swap-Transfer`)
            BtnSwaptoTransfer();
          }
        } else {
          if (document.getElementById('auto-claimnfts').checked == true) {
            bott.appendMessage(`Start Auto Check&Claims NFTs`)
            await bott.getClaimnfts();
          }
        }

      } else { bott.appendMessage(`CPU Overload : ${CpuChecks}`) }
    }
  }

  waitNonceReload() {
    console.log('waitNonceReload')
    const timerNonceReload = new TaskTimer(1000);
    timerNonceReload.add([
      {
        id: 'waitNonceReload',       // unique ID of the task                
        tickInterval: 60,   // run every 10 ticks (10 x interval = 10000 ms)
        totalRuns: 60,       // run 2 times only. (set to 0 for unlimited times)
        callback(task) {
          if (this.waitNoceMine == true) {
            console.log(`${task.id} Reload.`);
            location.reload();
          } else {
            timerNonceReload.stop()
          }
        }
      }
    ]);
    timerNonceReload.start()
  }

}
