
class bot {

  constructor() {
    this.checkMinedelay = false;
    this.autoClaimnfts;
    this.waitNoceMine;
    this.TimeWait = 0;
    this.Acceptmine = false;
    this.counttimetomine = 0;
    this.counttimetoST = 0;
    this.counttimestop = false;
    this.ban = 0;
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
      this.appendMessage(`Status Error :${err.message}`)
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
          if (bott.counttimestop == false) {
            document.getElementById("text-cooldown").innerHTML = Math.ceil(task.totalRuns - task.currentRuns) + " Sec"
            document.getElementsByTagName('title')[0].text = `${wax.userAccount} - ${Math.ceil(task.totalRuns - task.currentRuns)} Sec`
          } else {
            timer.reset();
          }
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
          if (document.getElementById('auto-SwapTransfer').checked == true || document.getElementById('auto-claimnfts').checked == true) {
            if (TimeWaitz > 200) {
              AutoSTC()
            } else if (document.getElementById('auto-SwapTransfer').checked == true) {
              bott.appendMessage(`Status : Swap-Transfer Time left < 100sec [NOT PASS])`)
            }else if (document.getElementById('auto-claimnfts').checked == true) {
              bott.appendMessage(`Status : Auto Claims Time left < 100sec [NOT PASS])`)
            }
          }
        }
      }
    ]);
    this.counttimestop = false
    await timer.start()
  }

  async CPUchecked() {
    const CpuCheckAllTime = parseInt(document.getElementById("CpuPercentProgress").value);
    const checkCpuPercent = parseInt(document.getElementById("cpu").value)
    //console.log('CPU CHECK PERCENT : ' + checkCpuPercent)
    if (checkCpuPercent != 0) {
      if (CpuCheckAllTime > checkCpuPercent) {
        this.counttimetomine++
        this.appendMessage("Status : CPU Check = Over " + checkCpuPercent + "% [NOT Passed!]")
        this.appendMessage(`Status : Counting (${this.counttimetomine}/60)--> Mine`)
        if (this.counttimetomine == 60) {
          this.counttimetomine = 0
          this.appendMessage(`Status : Mining..`)
          await Promise.all([bott.mine(), botzz.CheckingMinings()]);
        } else {
          this.TimeWait = 10000;
          await bott.timerForMine(this.TimeWait)
        }
      } else {
        this.appendMessage("Status : CPU Check = " + CpuCheckAllTime + "% [Passed Go Mine]")
        this.counttimetomine = 0
        await Promise.all([bott.mine(), botzz.CheckingMinings()]);
      }
    } else {
      await Promise.all([bott.mine(), botzz.CheckingMinings()]);
    }
  }

  async mineDelay() {
    if (document.getElementById("AutoMineFunction").checked == true) {
      this.counttimestop = false
      const userAccount = document.getElementById("text-user").innerHTML
      const minedelay = await getMineDelay(userAccount);
      this.appendMessage(`Status : MineDelay True ${Math.ceil(minedelay / 1000)} Sec`)
      var randTimeout = Math.random() * (10000 + (30000 * Math.random()))
      this.TimeWait = Math.ceil(minedelay + randTimeout);
      if (!isNaN(this.TimeWait)) {
        this.counttimestop = true
        await bott.timerForMine(this.TimeWait)
        this.appendMessage(`Status : MineDelay Used ${Math.ceil(this.TimeWait / 1000)} Sec`)
      } else {
        this.appendMessage(`Status Error : Can't Get time MineDelay`)
        this.appendMessage(`Status : Wait for 30 Sec`)
        await this.delay(30000);
        const minedelay = await getMineDelay(userAccount);
        this.appendMessage(`Status : MineDelay True ${Math.ceil(minedelay / 1000)} Sec`)
        var randTimeout = Math.random() * (10000 + (30000 * Math.random()))
        this.TimeWait = Math.ceil(minedelay + randTimeout);
        if (!isNaN(this.TimeWait)) {
          this.counttimestop = true
          await bott.timerForMine(this.TimeWait)
          this.appendMessage(`Status : MineDelay Used ${Math.ceil(this.TimeWait / 1000)} Sec`)
        } else {
          location.reload();
        }
      }
    } else { this.counttimestop = true }
  }

  async start() {
    try {
      loginzz.loginauto = false;
      const userAccount = await wax.login();
      if (userAccount) {
        this.appendMessage(`Status : Login Success.`)
        this.appendMessage(`Status : Welcome ${userAccount}`)
      }
      await botzz.MonitorRealtime();
      document.getElementById("btn-controller").hidden = true;
      const balance = await getBalance(wax.userAccount, wax.api.rpc);
      this.balanceBefore = balance.toString();
      this.appendMessage(`Status : Balance Before ${this.balanceBefore}`)
      document.getElementById("text-balance").innerHTML = balance
      document.getElementById("text-user").innerHTML = userAccount
      document.getElementsByTagName('title')[0].text = userAccount
      if (document.getElementById("AutoMineFunction").checked == true) {
        const minedelay = await getMineDelay(userAccount);
        this.TimeWait = Math.ceil(minedelay + 12000);
        await this.delay(3000);
        if (!isNaN(this.TimeWait)) {
          document.getElementById("btn-controller").innerHTML = "OK"
          await bott.timerForMine(this.TimeWait)
        } else {
          this.appendMessage(`Status Error : Can't Get time MineDelay`)
          await this.delay(3000);
          location.reload();
        }
      } else { this.counttimestop = true }
    } catch (err) {
      this.appendMessage(`Status Error : ${err.message}`)
      await this.delay(5000);
      location.reload();
    }
  }

  async mine() {
    this.counttimestop = true
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
      if (result && result.processed) {
        await this.delay(5000);
        await this.mineDelay()
      }
    } catch (err) {
      console.log(`Mine false : ${err.message}`);
      if (err.message.includes("Mine too soon", "NOTHING_TO_MINE", "Failed to fetch", "Cannot mine with an empty bag", "maximum billable CPU time")) {
        if (err.message.includes("Mine too soon")) {
          this.appendMessage(`Status Error : "Mine too soon" `)
          this.counttimestop = true
          this.appendMessage(`Status : Return to check MineDelay again`)
          await this.mineDelay()
        }
        if (err.message.includes("NOTHING_TO_MINE")) {
          this.ban++;
          this.appendMessage(`Status Error : NOTHING_TO_MINE (${this.ban}/3)`)
          await this.delay(5000);
          if (this.ban != 3) {
            this.counttimestop = true
            this.appendMessage(`Status : Try to mine again`)
            await this.mineDelay()
          } else {
            document.getElementsByTagName('title')[0].text = `ID has been Banned`
            Swal.fire({
              icon: 'error',
              title: 'Your id has been banned',
              html: 'The system will shut down for another 4 hours.',
              showConfirmButton: false,
              timer: 14400000
            })
            await this.delay(14400000);
          }
        }
        if (err.message.includes("Failed to fetch")) {
          this.appendMessage(`Status Error : Failed to fetch`)
          this.appendMessage(`Status : Reloading`)
          await this.delay(5000);
          this.counttimestop = true
          location.reload();
        }
        if (err.message.includes("Cannot mine with an empty bag")) {
          this.appendMessage(`Status Error : Please set bag first`)
          this.counttimestop = true
          Swal.fire({
            icon: 'info',
            title: 'Empty bag',
            html: 'Please set bag first.',
            showConfirmButton: true
          })
        }
        if (err.message.includes("maximum billable CPU time")) {
          this.appendMessage(`Status Error : CPU Overload`)
          this.appendMessage(`Status : Return check CPU again`)
          await this.delay(5000);
          this.counttimestop = true
          await bott.CPUchecked()
        }
      } else {
        this.appendMessage(`Status Error : ${err.message}`)
        await this.delay(10000);
        location.reload();
      }
    }
    const afterMindedBalance = await getBalance(wax.userAccount, wax.api.rpc);
    const balanceAfter = parseFloat(afterMindedBalance)
    this.appendMessage(`Status : Last Balance = ${balanceAfter} TLM`)
    const showbalanceTrue = parseFloat(balanceAfter) - parseFloat(this.balanceBefore)
    if (showbalanceTrue > 0) {
      this.appendMessage(`Mine Success GET: ${parseFloat(showbalanceTrue).toFixed(4)} TLM`, '2')
      document.getElementById("TLMPerRound").innerHTML = parseFloat(showbalanceTrue).toFixed(4) + ' TLM'
      document.getElementById("text-balance").innerHTML = afterMindedBalance
    }
    this.balanceBefore = afterMindedBalance
  }

  async getNonce() {
    try {
      let nonce = null;
      let message = ''
      const serverGetNonce = document.querySelector('input[name="server"]:checked').value
      if (serverGetNonce == 'ok-nonce' || serverGetNonce == 'ninjamine-vip') {
        if (serverGetNonce == 'ninjamine-vip') {
          this.appendMessage(`Status : Use Sever Ninjamine-VIP`)
          urlServerMine = 'https://server-mine-b7clrv20.an.gateway.dev/server_mine_vip' + '?wallet=' + wax.userAccount
        }
        if (serverGetNonce == 'ok-nonce') {
          this.appendMessage(`Status : Use Sever Tlmminer`)
          urlServerMine = `https://mine.tlmminer.com?wallet=${wax.userAccount}&hashfail=` + (this.checkInvalid == true ? '1' : '0')
        }
        console.log('urlServerMine =', urlServerMine)
        nonce = await this.postData(urlServerMine, {}, 'GET', { Origin: "" }, 'raw')
        if (nonce == '') {
          const mine_work = await background_mine(wax.userAccount)
          nonce = mine_work.rand_str
          console.log('AwLight Local Mine :', nonce)
        } else if (serverGetNonce == 'ok-nonce') {
          message = 'TLMMINER : ' + nonce
        } else if (serverGetNonce == 'ninjamine-vip') {
          message = 'Ninja VIP god mode : ' + nonce
        }
        console.log(message)
      }
      if (serverGetNonce == 'Meanow-Mine' || nonce == '') {
        this.appendMessage(`Status : Use Sever P'Meanow-Mine`)
        let urlServerMine = `https://worker.meanow-mine.work/?wallet=${wax.userAccount}`
        const mine_work = await this.postData(urlServerMine, {}, 'GET', { Origin: "" }, 'raw')
        nonce = mine_work.rand_str
        console.log('nonce = ' + nonce)
      }

      if (serverGetNonce == 'AwLight' || nonce == '') {
        /*const bagDifficulty = await getBagDifficulty(wax.userAccount);
        const landDifficulty = await getLandDifficulty(wax.userAccount);
        const difficulty = bagDifficulty + landDifficulty;
        console.log('difficulty', difficulty);

        console.log('Start AwlightSvMine = ' + Date.now());         
        const last_mine_tx = await lastMineTx(mining_account, wax.userAccount, wax.api.rpc);
        console.log('last_mine_tx = ' + last_mine_tx);  
        this.appendMessage(`Status : Use SeverFree Mine`)        
        let urlServerMine = 'https://server-mine-b7clrv20.an.gateway.dev/server_mine?' + '?wallet=' + wax.userAccount
        const mine_work = await this.postData(urlServerMine, {}, 'GET', { Origin: "" }, 'raw')
        nonce = mine_work.substr(1, 16)          
        console.log('nonce = ' + nonce);*/
        this.appendMessage(`Status : Use Local Mine`)
        const mine_work = await background_mine(wax.userAccount)
        nonce = mine_work.rand_str
        console.log('AwLight Local Mine : ', nonce)
      }
      this.appendMessage(`Status : Nonce Successful (${nonce})`)
      this.waitNoceMine = false
      return nonce;
    } catch (err) {
      this.appendMessage(`Status : getNonce Error = ${err.message}`)
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
    if (nft_res.rows.length) {
      const items_p = nft_res.rows[0].template_ids.map((template_id) => {
        return aa_api.getTemplate("alien.worlds", template_id)
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
      this.appendMessage(`Status : Swap TLM > WAXP in progress..`)
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
        this.appendMessage(`Status : Swap Successful`)
        /*Swal.fire({
          icon: 'success',
          title: 'Swap Successful',
          html: 'You swap.. ' + amount_sell + ' TLM to.. ' + ' Waxp',
          showConfirmButton: false,
          timer: 2500
        })*/
        return `Complete Swap ${amount_sell} TLM `
      }
    } catch (error) {
      this.appendMessage(`Status : Swap Failed`)
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
      this.appendMessage(`Status : Stake CPU in progress..`)
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
        this.appendMessage(`Status : Stake ${amount} Wax Successful`)
        /*Swal.fire({
          icon: 'success',
          title: 'Stake Successful',
          html: 'You stake.. ' + amount + ' Wax Successful',
          showConfirmButton: false,
          timer: 2500
        })*/
        return `Complete stake ${amount} WAX `
      }
      return 0;
    } catch (error) {
      this.appendMessage(`Status : You Stake Failed`)
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
      this.appendMessage(`Status : Transfer in progress..`)
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
        this.appendMessage(`Status : Transfer ${amount} WAX To ${toAcc} Successful `)
        return `Transfer ${amount} WAX from ${account} to ${toAcc}`
      }
      return 0;
    } catch (error) {
      this.appendMessage(`Status : Transfer Failed Please try agian`)
      throw error;
    }
  }

  async moveland(account, land) {
    try {
      this.appendMessage(`Status : Change Land in progress..`)
      var account = document.getElementById("text-user").innerHTML
      var land = document.getElementById("text_set_land").value
      console.log(`Change Land ${land} ...`);
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
          title: 'Move Land Successful',
          html: 'Succsess : Move Land to ' + land,
          showConfirmButton: false,
          timer: 2500
        })*/
        this.appendMessage(`Status : Successful change land ID ${land}`)
        return `Complete Move to ID ${land} Land `
      }
      return 0;
    } catch (error) {
      this.appendMessage(`Status : Failed change land. Please try agian.`)
      throw error;
    }
  }

  async setBags() {
    try {
      this.appendMessage(`Status : Set BAG in progress..`)
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
          title: 'Move Land Successful',
          html: 'Succsess : Change Tools : ' + result.processed,
          showConfirmButton: false,
          timer: 2500
        })*/
        this.appendMessage(`Status :  Successful set BAG`)
        return `Succsess : Change Tools = ${result.processed}`
      }
    } catch (err) {
      this.appendMessage(`Status Error : ${err.message}`)
      this.appendMessage(`Status : Failed set BAG. Please try again.`)
      throw err;
    }
  }

  async AutoSwapTransferAndClaim() {
    const CpuChecks = parseInt(document.getElementById("CpuPercentProgress").value);
    const CpuPercentfix = parseInt(document.getElementById("cpu").value)
    this.counttimetoST++
    if (document.getElementById('auto-SwapTransfer').checked == true) {
      bott.appendMessage(`Stauts : Swap-Transfer(Auto) Count (${this.counttimetoST}/5)`)
      if (this.counttimetoST == 5) {
        this.counttimetoST = 0;
        if (CpuChecks < CpuPercentfix) {
          bott.appendMessage(`Status : CPU level = ${CpuChecks}% [PASS]`)
          const BalanceTLM = parseFloat(document.getElementById("text-balance").innerHTML).toFixed(4)
          const amountToST = parseFloat(document.getElementById("amountToST").innerHTML)
          if (BalanceTLM > amountToST) {
            bott.appendMessage(`Status : You have ${BalanceTLM} TLM [PASS]`)
            bott.appendMessage(`Start Auto Swap-Transfer`)
            BtnSwaptoTransfer();
          } else {
            bott.appendMessage(`Status : You have ${BalanceTLM} TLM [NOT PASS]`)
          }
        } else {
          bott.appendMessage(`Status Error : CPU Overload = ${CpuChecks}% [NOT PASS]`)
          bott.appendMessage(`Status : Swap-Transfer(Auto) canceled. Wait for the next time.`)
        }
      }
    }
    if (document.getElementById('auto-claimnfts').checked == true) {
      bott.appendMessage(`Stauts : Claims(Auto) Count (${this.counttimetoST}/5)`)
      if (this.counttimetoST == 5) {
        this.counttimetoST = 0;
        if (CpuChecks < CpuPercentfix) {
          bott.appendMessage(`Status : CPU level = ${CpuChecks}% [PASS]`)
          bott.appendMessage(`Start Auto Check&Claims NFTs`)
          await bott.getClaimnfts();
        } else {
          bott.appendMessage(`Status Error : CPU Overload = ${CpuChecks}% [NOT PASS]`)
          bott.appendMessage(`Status : Claims(Auto) canceled. Wait for the next time.`)
        }
      }
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
