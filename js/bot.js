
class bot {

  constructor() {
    this.checkMinedelay = false;
    this.autoClaimnfts;
    this.TimeWait = 0;
    this.Acceptmine = false;
    this.counttimetomine = 0;
    this.counttimetoST = 0;
    this.counttimestop = false;
    this.ban = 0;
    this.balanceBefore;
    this.waitNoceMine = false;
    this.checkInvalid;
    this.difficulty = '';
    this.BagDifficulty = '';
    this.LandDifficulty = '';
    this.nameworlds = '';
    this.averageend = 0;
    this.useAverage = false;
    this.averageComplete = false;
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
    botzz.countcheckstop = true;
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
          document.getElementById("text-cooldown").innerHTML = "Countdown : CheckCPU.."
          document.getElementsByTagName('title')[0].text = `${wax.userAccount} - CheckCPU..`
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
            document.getElementById("text-cooldown").innerHTML = `Countdown : ${Math.ceil(task.totalRuns - task.currentRuns)} Sec`;
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
            } else if (document.getElementById('auto-claimnfts').checked == true) {
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
    const limitCPUpassed = 1200;
    if (limitCPUpassed > botzz.cpuAvailable) {
      this.counttimetomine++
      this.appendMessage("Status : CPU Check = CPU " + botzz.cpuAvailable + "ms remaining [NOT Passed!]")
      this.appendMessage(`Status : Counting (${this.counttimetomine}/60)--> Mine`)
      if (this.counttimetomine == 60) {
        this.counttimetomine = 0;
        this.appendMessage(`Status : Mining..`);
        await Promise.all([bott.mine(), botzz.countdownReload()]);
      } else {
        this.TimeWait = 10000;
        await bott.timerForMine(this.TimeWait)
      }
    } else {
      this.appendMessage("Status : CPU Check = CPU " + botzz.cpuAvailable + "ms remaining [Passed Go Transection]");
      this.counttimetomine = 0;
      await Promise.all([bott.mine(), botzz.countdownReload()]);
    }
  }


  myRandom(min, max) {
    const N = max - min + 1;
    return ((Math.floor(Math.random() * N) + min) * 1000);
  }

  async mineDelay() {
    if (document.getElementById("AutoMineFunction").checked == true) {
      this.counttimestop = false
      const userAccount = document.getElementById("text-user").innerHTML
      const minedelay = await getMineDelay(userAccount);
      this.appendMessage(`Status : MineDelay True ${Math.ceil(minedelay / 1000)} Sec`)
      this.TimeWait = Math.ceil(minedelay + this.myRandom(15, 90));
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
        this.TimeWait = Math.ceil(minedelay + this.myRandom(15, 90));
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

  async loginA() {
    try {
      loginzz.loginauto = false;
      if (loginzz.CheckagreedTermsVersion == 1) {
        await botzz.countdownReload();
        const userAccount = await wax.login();
        document.getElementById("btn-controller").hidden = true;
        if (userAccount) {
          botzz.countcheckstop = true;
          this.appendMessage(`Status : Login WAX Success.`);
          this.appendMessage(`Status : Welcome ${userAccount}`);
          await botzz.MonitorRealtime();
          document.getElementById("text-user").innerHTML = userAccount;
          document.getElementsByTagName('title')[0].text = userAccount;
          this.Auto();
        } else {
          this.appendMessage(`Status : Login Falsed.`)
          this.appendMessage(`Status : Login Again in 30 sec.`)
          document.getElementById("btn-controller").hidden = false;
          await this.delay(30000);
          await this.loginA()
        }
      } else {
        await loginzz.funcCheckagreedTermsVersion()
      }

    } catch (err) {
      this.appendMessage(`Status : Login Falsed.`)
      this.appendMessage(`Status : ${err.message}`)
      this.appendMessage(`Status : Reloading in 180 sec`)
      await this.delay(180000);
      location.reload();
    }
  }

  async Auto() {
    try {
      const balance = await getBalance(wax.userAccount, wax.api.rpc);
      this.balanceBefore = balance.toString();
      this.appendMessage(`Status : Balance Before ${this.balanceBefore}`)
      document.getElementById("text-balance").innerHTML = `TLM Total : ${parseFloat(balance).toFixed(4)} Tlm`
      if (document.getElementById("AutoMineFunction").checked == true) {
        const minedelay = await getMineDelay(wax.userAccount);
        this.TimeWait = Math.ceil(minedelay + this.myRandom(12, 36));
        await this.delay(3000);
        if (!isNaN(this.TimeWait)) {
          document.getElementById("btn-controller").innerHTML = "OK"
          await bott.timerForMine(this.TimeWait)
        } else {
          this.appendMessage(`Status Error : Can't Get time MineDelay`)
          this.appendMessage(`Status : Reloading in 180 sec`)
          await this.delay(180000);
          location.reload();
        }
      } else { this.counttimestop = true }
    } catch (err) {
      this.appendMessage(`Status : Login Falsed.`)
      this.appendMessage(`Status : ${err.message}`)
      this.appendMessage(`Status : Reloading in 180 sec`)
      await this.delay(180000);
      location.reload();
    }
  }

  async checkpool(worlds) {    
    const gg = await bott.postData('HTTPS://CHAIN.WAX.IO/v1/chain/get_table_rows', {
      "json": true,
      "code": "m.federation",
      "scope": worlds,
      "table": "state3",
      "index_position": 1,
      "limit": 101,
      "reverse": ![],
    }, 'POST')
    //console.log(parseFloat(gg.rows[0].mine_bucket).toFixed(4))
    const result = parseFloat(gg.rows[0].mine_bucket).toFixed(4)
    return result
  }

  async mine() {
    this.counttimestop = true;
    document.getElementById("btn-mine").disabled = true;
    document.getElementById("text-cooldown").innerHTML = "Countdown : Mining..";
    document.getElementsByTagName('title')[0].text = `${wax.userAccount} - Mining`;
    const nonce = await this.getNonce();
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
      var checkpools = 0.0000
      var count = 0
      var countpush = 0
      var average = 0 
      var i = 0
      do {
        await this.delay(1500)
        if (this.nameworlds !== '') {
          checkpools = await this.checkpool(this.nameworlds)
        } else {
          await allfunc.SetLandInfo()
          checkpools = await this.checkpool(this.nameworlds)
        }
        if(checkpools > 0.1){
          countpush++
          i++
          this.appendMessage(`Status : Finding Rate Pools [Count ${i}] = ${parseFloat(checkpools).toFixed(4)}`)          
          average += checkpools*10000
          console.log(average)
          if (countpush >= 10) {
            this.averageend = ((average/10000)/(countpush+2)).toFixed(4)
            this.appendMessage(`Status : Rate Pools Average = ${parseFloat(this.averageend).toFixed(4)}`)
            console.log(this.averageend)  
            this.useAverage = true      
          }            
        }
        if (this.averageend < checkpools && this.useAverage == true){          
          count++
          this.appendMessage(`Status : Pools Average = ${parseFloat(this.averageend).toFixed(4)} < ${parseFloat(checkpools).toFixed(4)} [GO MINE]`)          
        } else if (this.useAverage == true) {
          count = 0
          this.appendMessage(`Status : Pools Average = ${parseFloat(this.averageend).toFixed(4)} < ${parseFloat(checkpools).toFixed(4)} [NOT PASS]`)
          await this.delay(1500)
        }         
      } while (count < 1) {                  
        const result = await wax.api.transact({ actions }, { blocksBehind: 3, expireSeconds: 90 });
        if (result && result.processed) {
          await this.delay(5000);
          await this.mineDelay()
          const afterMindedBalance = await getBalance(wax.userAccount, wax.api.rpc);
          const balanceAfter = parseFloat(afterMindedBalance)
          this.appendMessage(`Status : Last Balance = ${parseFloat(balanceAfter).toFixed(4)}`)
          var TLMofeachtimeTrue = parseFloat(balanceAfter) - parseFloat(this.balanceBefore)
          if (TLMofeachtimeTrue > 0) {
            this.appendMessage(`Mine Success GET: ${parseFloat(TLMofeachtimeTrue).toFixed(4)} TLM`, '2');
            document.getElementById("TLMPerRound").innerHTML = `TLM Last : ${parseFloat(TLMofeachtimeTrue).toFixed(4)} Tlm`;
            document.getElementById("text-balance").innerHTML = `TLM Total : ${parseFloat(afterMindedBalance).toFixed(4)} Tlm`;
            botzz.countcheckstop = true;
            await botzz.getTlmperDate(TLMofeachtimeTrue)
            TLMofeachtimeTrue = 0;
          }
          this.balanceBefore = afterMindedBalance
          document.getElementById("btn-mine").disabled = false
        }
      }
    } catch (err) {
      this.appendMessage(`Error in function mine`)
      await this.errorcatch(err)
    }
  }

  async getNonce() {
    try {
      let nonce = null;
      let sv_mine_work = null;
      let message = ''
      const serverGetNonce = document.querySelector('input[name="server"]:checked').value
      let urlServerMine = `https://server-mine-b7clrv20.an.gateway.dev/server_mine?wallet=${wax.userAccount}`
      if (serverGetNonce == 'ok-nonce' || serverGetNonce == 'ninjamine-vip') {
        if (serverGetNonce == 'ninjamine-vip') {
          this.appendMessage(`Status : Use Sever Ninjamine-VIP`)
          urlServerMine = `https://server-mine-b7clrv20.an.gateway.dev/server_mine_vip?wallet=${wax.userAccount}`
        }
        if (serverGetNonce == 'ok-nonce') {
          this.appendMessage(`Status : Use Sever Tlmminer`)
          urlServerMine = `https://mine.tlmminer.com?wallet=${wax.userAccount}&hashfail=` + (this.checkInvalid == true ? '1' : '0')
        }
        console.log('urlServerMine =', urlServerMine)
        nonce = await this.postData(urlServerMine, {}, 'GET', { Origin: "" }, 'raw')
        if (nonce == '') {
          nonce = await this.localnonce()
        } else if (serverGetNonce == 'ok-nonce') {
          message = 'TLMMINER : ' + nonce
        } else if (serverGetNonce == 'ninjamine-vip') {
          message = 'Ninja VIP god mode : ' + nonce
        }
        console.log(message)
      }
      if (serverGetNonce == 'Meanow-Mine' || nonce == '') {
        this.appendMessage(`Status : Use Sever P'Meanow-Mine`)
        urlServerMine = `https://worker.meanow-mine.work/?wallet=${wax.userAccount}`
        nonce = await this.postData(urlServerMine, {}, 'GET', { Origin: "" }, 'raw')
      }
      if (serverGetNonce == 'AwLight' || nonce == '') {
        if (typeof this.BagDifficulty !== "number" && typeof this.LandDifficulty !== "number") {
          const bagDifficulty = await getBagDifficulty(wax.userAccount);
          const landDifficulty = await getLandDifficulty(wax.userAccount);
          const difficulty = bagDifficulty + landDifficulty;
          this.difficulty = difficulty
        }
        console.log('Difficulty = ' + this.difficulty)
        const last_mine_tx = await lastMineTx(mining_account, wax.userAccount, wax.api.rpc);
        console.log('last_mine_tx = ' + last_mine_tx);
        var server = ''
        if (document.getElementById('servermining').value !== '') {
          this.appendMessage(`Status : Use Sever private Mine`);
          server = document.getElementById('servermining').value
          urlServerMine = server
          console.log(urlServerMine)
          this.appendMessage(`Status : Use [${urlServerMine}]`)
          sv_mine_work = await this.postData(urlServerMine + `/mine?waxaccount=${wax.userAccount}&difficulty=${this.difficulty}&lastMineTx=${last_mine_tx}`, {}, 'GET', { Origin: "" }, 'raw')
          if (sv_mine_work == '') {
            return await this.localnonce()
          } else {
            nonce = sv_mine_work
          }
        } else {
          this.appendMessage(`Status : Use Awlight SeverFree Mine`);
          server = ['https://svmine-node-2-u5o2g.ondigitalocean.app', 'https://svmine-node-vjan5.ondigitalocean.app'];
          urlServerMine = server[Math.floor(Math.random() * server.length)];
          this.appendMessage(`Status : Use [${urlServerMine}]`)
          sv_mine_work = await this.postData(urlServerMine + `/mine?waxaccount=${wax.userAccount}&difficulty=${this.difficulty}&lastMineTx=${last_mine_tx}`, {}, 'GET', { Origin: "" }, 'raw')
          if (sv_mine_work == '') {
            return await this.localnonce()
          } else {
            nonce = sv_mine_work
          }
        }
      }
      this.appendMessage(`Status : Nonce Successful (${nonce})`)
      return nonce;
    } catch (err) {
      this.appendMessage(`Error in function getNonce`)
      await this.errorcatch(err)
    }
  }

  async localmine() {
    this.counttimestop = true;
    document.getElementById("btn-mine").disabled = true;
    document.getElementById("text-cooldown").innerHTML = "Countdown : Mining..";
    document.getElementsByTagName('title')[0].text = `${wax.userAccount} - Mining`;
    const nonce = await this.localnonce();
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
      var checkpools = 0.0000
      var count = 0
      var countpush = 0
      var average = 0 
      var i = 0
      do {
        await this.delay(1500)
        if (this.nameworlds !== '') {
          checkpools = await this.checkpool(this.nameworlds)
        } else {
          await allfunc.SetLandInfo()
          checkpools = await this.checkpool(this.nameworlds)
        }
        if(checkpools > 0.1){
          countpush++
          i++
          this.appendMessage(`Status : Finding Rate Pools [Count ${i}] = ${parseFloat(checkpools).toFixed(4)}`)          
          average += checkpools*10000
          console.log(average)
          if (countpush >= 10) {
            this.averageend = ((average/10000)/(countpush+2)).toFixed(4)
            this.appendMessage(`Status : Rate Pools Average = ${parseFloat(this.averageend).toFixed(4)}`)
            console.log(this.averageend)  
            this.useAverage = true      
          }            
        }
        if (this.averageend < checkpools && this.useAverage == true){          
          count++
          this.appendMessage(`Status : Pools Average = ${parseFloat(this.averageend).toFixed(4)} < ${parseFloat(checkpools).toFixed(4)} [GO MINE]`)
        } else if (this.useAverage == true) {
          count = 0
          this.appendMessage(`Status : Pools Average = ${parseFloat(this.averageend).toFixed(4)} < ${parseFloat(checkpools).toFixed(4)} [NOT PASS]`)
          await this.delay(1500)
        }   
      } while (count < 1) {                      
        const result = await wax.api.transact({ actions }, { blocksBehind: 3, expireSeconds: 90 });
        if (result && result.processed) {
          await this.delay(5000);
          await this.mineDelay()
          const afterMindedBalance = await getBalance(wax.userAccount, wax.api.rpc);
          const balanceAfter = parseFloat(afterMindedBalance)
          this.appendMessage(`Status : Last Balance = ${parseFloat(balanceAfter).toFixed(4)}`)
          var TLMofeachtimeTrue = parseFloat(balanceAfter) - parseFloat(this.balanceBefore)
          if (TLMofeachtimeTrue > 0) {
            this.appendMessage(`Mine Success GET: ${parseFloat(TLMofeachtimeTrue).toFixed(4)} TLM`, '2');
            document.getElementById("TLMPerRound").innerHTML = `TLM Last : ${parseFloat(TLMofeachtimeTrue).toFixed(4)} Tlm`;
            document.getElementById("text-balance").innerHTML = `TLM Total : ${parseFloat(afterMindedBalance).toFixed(4)} Tlm`;
            botzz.countcheckstop = true;
            await botzz.getTlmperDate(TLMofeachtimeTrue)
            TLMofeachtimeTrue = 0;
          }
          this.balanceBefore = afterMindedBalance
          document.getElementById("btn-mine").disabled = false
        }
      }
    } catch (err) {
      this.appendMessage(`Error in function localmine`)
      await this.errorcatch(err)
    }
  }

  async localnonce() {
    try {
      // bott.waitNoceMine = true
      // this.waitNonceReload();      
      let nonce = '';
      this.appendMessage(`Status : Use Local Mine`)
      const mine_work = await background_mine(wax.userAccount)
      if (mine_work.rand_str != '') {
        nonce = mine_work.rand_str
        console.log('AwLight Local Mine : ', nonce)
        this.appendMessage(`Status : Nonce Successful (${nonce})`)
        return nonce;
        // bott.waitNoceMine = false
      } else {
        await this.localmine()
      }
    } catch (err) {
      this.appendMessage(`Error in function localnonce`)
      await this.errorcatch(err)
    }
  }

  async errorcatch(err) {
    this.counttimestop = true
    console.log(`Mine false : ${err.message}`);
    if (err.message.includes('INVALID_HASH')) {
      this.appendMessage(`Status : "INVALID_HASH" `)
      this.appendMessage(`Status : Return to check MineDelay again`)
      await this.delay(5000);
      botzz.countcheckstop = true;
      await this.mineDelay();
    } else if (err.message.includes('started a new transaction')) {
      this.appendMessage(`Status : "Started a new transaction" `)
      this.appendMessage(`Status : Return to check MineDelay again`)
      await this.delay(5000);
      botzz.countcheckstop = true;
      await this.mineDelay();
    } else if (err.message.includes("Failed to fetch")) {
      botzz.countcheckstop = true
      this.appendMessage(`Status Error : Failed to fetch`)
      this.appendMessage(`Status : Reloading in 30 sec`)
      document.getElementById("text-cooldown").innerHTML = "Countdown : Reloading"
      document.getElementsByTagName('title')[0].text = `Reloading in 30 sec`
      await this.delay(30000);
      location.reload();
    } else if (err.message.includes("maximum billable CPU")) {
      botzz.countcheckstop = true
      this.appendMessage(`Status Error : CPU Overload`)
      this.appendMessage(`Status : Return check CPU again`)
      await this.delay(5000);
      await bott.CPUchecked()
    } else if (err.message.includes("Mine too soon")) {
      botzz.countcheckstop = true
      this.appendMessage(`Status Error : "Mine too soon" `)
      this.appendMessage(`Status : Return to check MineDelay again`)
      await this.delay(5000);
      await this.mineDelay();
    } else if (err.message.includes("NOTHING_TO_MINE")) {
      botzz.countcheckstop = true
      this.ban++;
      this.appendMessage(`Status Error : NOTHING_TO_MINE`)
      await this.delay(5000);
      if (this.ban != 5) {
        this.appendMessage(`Status : Try mining for sure. (${this.ban}/5)`)
        await this.mineDelay()
      } else {
        document.getElementsByTagName('title')[0].text = `ID has been Banned`
        this.appendMessage(`Status : Sorry, You have been banned by the game.`)
        Swal.fire({
          icon: 'error',
          title: 'Sorry, You have been banned by the game.',
          html: 'The system stop. Please change your ID good lucks.',
          showConfirmButton: true
        })
      }
    } else if (err.message.includes("empty bag")) {
      botzz.countcheckstop = true
      this.appendMessage(`Status Error : Please set bag first`)
      Swal.fire({
        icon: 'info',
        title: 'Empty bag',
        html: 'Please set bag first.',
        showConfirmButton: true
      })
    }
    else {
      this.appendMessage(`Unknown error : ${err.message}`)
      botzz.countcheckstop = true
      document.getElementById("text-cooldown").innerHTML = "Countdown : Reloading"
      document.getElementsByTagName('title')[0].text = `Reloading in 1 minutes`
      this.appendMessage(`Status : Wait 1 minutes for reload`)
      await this.delay(60000);
      location.reload();
      //this.counttimestop = true      
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
    bott.appendMessage(`Status : Start Auto Check&Claims NFTs`);
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
      var amount_sell = (parseFloat(document.getElementById("text_swap_tlm").value) + 0.0000).toFixed(4)// + " TLM"
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

  async stakecpu(amount) {
    try {
      this.appendMessage(`Status : Stake CPU in progress..`)
      if (document.getElementById('box-message1')) {
        this.appendMessage(`Status : Stake CPU in progress..`, 1)
      }
      console.log(`Staking ${amount} WAX to CPU...`);
      const stake = {
        'from': wax.userAccount,
        'receiver': wax.userAccount,
        'stake_net_quantity': `0.00000000 WAX`,
        'stake_cpu_quantity': `${parseFloat(amount).toFixed(8)} WAX`,
        'transfer': false
      };
      const actions = [{
        'account': 'eosio',
        'name': 'delegatebw',
        'authorization': [{
          'actor': wax.userAccount,
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
        if (document.getElementById('box-message1')) {
          this.appendMessage(`Status : Stake ${amount} Wax Successful`, 1)
        }
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
      if (document.getElementById('box-message1')) {
        this.appendMessage(`Status : You Stake Failed`, 1)
      }
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

  async transfer(toAcc, memo, amount) {
    try {
      this.appendMessage(`Status : Transfer in progress..`)
      console.log(`${wax.userAccount} Transfering ${amount} WAX to ${toAcc}...`);
      if (document.getElementById('box-message1')) {
        this.appendMessage(`Status : Transfer in progress..`, 1)
      }
      const transferWAX = {
        'from': wax.userAccount,
        'to': toAcc,
        'quantity': `${parseFloat(amount - 0.0001).toFixed(8)}  WAX`,
        'memo': memo
      };
      const actions = [{
        'account': 'eosio.token',
        'name': 'transfer',
        'authorization': [{
          'actor': wax.userAccount,
          'permission': 'active'
        }],
        'data': transferWAX
      }];
      const result = await wax.api.transact({ actions }, { blocksBehind: 3, expireSeconds: 90 });
      if (result && result.processed) {
        if (document.getElementById('box-message1')) {
          this.appendMessage(`Status : Transfer ${result.processed.action_traces[0].act.data.quantity}`, 1)
          this.appendMessage(`Status : To. ${result.processed.action_traces[0].act.data.to} , Memo. ${result.processed.action_traces[0].act.data.memo}`, 1)
          this.appendMessage(`Status : Transaction Successful `, 1)
        }
        this.appendMessage(`Status : Transfer ${result.processed.action_traces[0].act.data.quantity}`)
        this.appendMessage(`Status : To. ${result.processed.action_traces[0].act.data.to} , Memo. ${result.processed.action_traces[0].act.data.memo}`)
        this.appendMessage(`Status : Transaction Successful `)
        return console.log(result);
      }
    } catch (err) {
      if (document.getElementById('box-message1')) {
        this.appendMessage(`Status : Transfer Failed`, 1)
        this.appendMessage(`Status : ${err}`, 1)
      }
      this.appendMessage(`Status : Transfer Failed`)
      this.appendMessage(`Status : ${err}`)
      throw err;
    }
  }

  async moveland(account, land) {
    try {
      this.appendMessage(`Status : Change Land in progress..`);
      if (document.getElementById('box-message3')) {
        this.appendMessage(`Status : Change Land in progress..`, 3);
      }
      console.log(`Account = ${account} ...`);
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

        if (document.getElementById('box-message3')) {
          this.appendMessage(`Status : Successful change land ID ${land}`, 3)
        }
        return this.appendMessage(`Status : Successful change land ID ${land}`)
      }
      return 0;
    } catch (error) {
      this.appendMessage(`Status : Failed change land. Please try agian.`)
      if (document.getElementById('box-message3')) {
        this.appendMessage(`Status : Failed change land. Please try agian.`, 3)
      }
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
    const limitCPUpassed = 1000;
    this.counttimetoST++
    if (document.getElementById('auto-SwapTransfer').checked == true) {
      bott.appendMessage(`Stauts : Swap-Transfer(Auto) Count (${this.counttimetoST}/5)`)
      if (this.counttimetoST == 5) {
        this.counttimetoST = 0;
        if (botzz.cpuAvailable > limitCPUpassed) {
          bott.appendMessage(`Status : CPU ${botzz.cpuAvailable}ms remaining [PASS]`)
          const BalanceTLM = parseFloat(document.getElementById("text-balance").innerHTML).toFixed(4)
          const amountToST = parseFloat(document.getElementById("amountToST").value)
          if (BalanceTLM > amountToST) {
            bott.appendMessage(`Status : You have ${BalanceTLM} TLM [PASS]`)
            BtnSwaptoTransfer();
          } else {
            bott.appendMessage(`Status : You have ${BalanceTLM} TLM [NOT PASS]`)
          }
        } else {
          bott.appendMessage(`Status Error : CPU ${botzz.cpuAvailable}ms remaining [NOT PASS]`)
          bott.appendMessage(`Status : Swap-Transfer(Auto) canceled. Wait for the next time.`)
        }
      }
    }
    if (document.getElementById('auto-claimnfts').checked == true) {
      bott.appendMessage(`Stauts : Claims(Auto) Count (${this.counttimetoST}/5)`)
      if (this.counttimetoST == 5) {
        this.counttimetoST = 0;
        if (botzz.cpuAvailable > limitCPUpassed) {
          bott.appendMessage(`Status : CPU ${botzz.cpuAvailable}ms remaining [PASS]`)
          await bott.getClaimnfts();
        } else {
          bott.appendMessage(`Status Error : CPU ${botzz.cpuAvailable}ms remaining [NOT PASS]`)
          bott.appendMessage(`Status : Claims(Auto) canceled. Wait for the next time.`)
        }
      }
    }
  }

  waitNonceReload() {
    console.log('waitNonceReload')
    this.appendMessage(`Status : If find nonce with local over 45 seconds will reload`)
    const timerNonceReload = new TaskTimer(1000);
    timerNonceReload.add([
      {
        id: 'waitNonceReload',       // unique ID of the task                
        tickInterval: 45,   // run every 10 ticks (10 x interval = 10000 ms)
        totalRuns: 45,       // run 2 times only. (set to 0 for unlimited times)
        callback(task) {
          if (bott.waitNoceMine == true) {
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
