var gameLoaded = false;
var log = "";
var logDownloaded = false;

const wax = new waxjs.WaxJS('https://wax.pink.gg'); //old url https://api.waxsweden.org

async function server_login() {
  try {
    const userAccount = await wax.login();
    unityInstance.SendMessage(
      'Controller',
      'Server_Response_LoginData',
      userAccount
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      readError(error.message)
    );
  }
}

async function onGameLoaded() {
  try {
    gameLoaded = true;
    var platform = 'desktop';
    if (UnityLoader.SystemInfo.mobile) platform = 'mobile';

    unityInstance.SendMessage(
      'Controller',
      'Server_Response_SetPlatformData',
      platform
    );

    unityInstance.SendMessage(
      'Controller',
      'Server_Response_SetCardHash',
      hashStr
    );

    setInterval(checkScreenResolution, 1000);
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

function checkScreenResolution() {
  Resize();
}

async function server_agreeTerms(account, terms_id, terms_hash) {
  try {
    await agreeTerms(federation_account, account, terms_id, terms_hash, wax.api);
    unityInstance.SendMessage(
      'Controller',
      'Server_Response_AgreeTerms',
      JSON.stringify({ terms_id: terms_id })
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_agreedTermsVersion(account) {
  try {
    var terms_id = await agreedTermsVersion(federation_account, account, wax.api.rpc);
    unityInstance.SendMessage(
      'Controller',
      'Server_Response_AgreedTermsVersion',
      JSON.stringify({ terms_id: terms_id })
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_setPlayerData(account, avatar_id, tag) {
  try {
    await setPlayerData(federation_account, account, wax.api, tag, avatar_id);
    unityInstance.SendMessage(
      'Controller',
      'Server_Response_SetPlayerData',
      JSON.stringify({ tag: tag, avatar_id: avatar_id })
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_setTagData(account, tag) {
  try {
    await setTagData(federation_account, account, wax.api, tag);
    unityInstance.SendMessage(
      'Controller',
      'Server_Response_SetTagData',
      JSON.stringify({ tag: tag })
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_getPlayerData(account) {
  try {
    var data = await getPlayerData(
      federation_account,
      account,
      wax.api.rpc,
      aa_api
    );
    unityInstance.SendMessage(
      'Controller',
      'Server_Response_GetPlayerData',
      JSON.stringify(data)
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_setLand(account, land_id) {
  try {
    await setLand(mining_account, account, land_id, wax.api);
    unityInstance.SendMessage('Controller', 'Server_Response_SetLand', land_id);
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_getLand(account) {
  try {
    var data = await getLand(
      federation_account,
      mining_account,
      account,
      wax.api.rpc,
      aa_api
    );
    unityInstance.SendMessage(
      'Controller',
      'Server_Response_GetLand',
      JSON.stringify(data)
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_getLandById(land_id) {
  try {
    var data = await getLandById(federation_account, land_id, wax.api.rpc, aa_api);
    unityInstance.SendMessage(
      'Controller',
      'Server_Response_GetLandById',
      JSON.stringify(data)
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_getMap(planet_name) {
  try {
    var mapData = await getMap(federation_account, planet_name, wax.api);
    var map = [];
    for (var i = 0; i < 800; ++i) {
      map.push('');
    }
    mapData.forEach((elem, column) => {
      elem.forEach((land_id, row) => {
        // columns start from 1 to 40
        // rows start from 1 to 20
        var index = (row - 1) * 40 + (column - 1);
        map[index] = land_id;
      });
    });

    unityInstance.SendMessage(
      'Controller',
      'Server_Response_GetMap',
      JSON.stringify({ planet: planet_name, map: map })
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_getPlanets() {
  try {
    var data = await getPlanets(federation_account, mining_account, wax.api.rpc);
    unityInstance.SendMessage(
      'Controller',
      'Server_Response_GetPlanets',
      JSON.stringify(data)
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_setBag(account, bag) {
  try {
    var items = JSON.parse(bag).items;
    if (items === undefined) throw new Error('missing items');
    if (items.length < 1 || items.length > 3)
      throw new Error('bag size must be [1-3]');

    await setBag(mining_account, account, items, wax.api);
    unityInstance.SendMessage('Controller', 'Server_Response_SetBag', bag);
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_getBag(account) {
  try {
    var data = await getBag(mining_account, account, wax.api.rpc, aa_api);
    unityInstance.SendMessage(
      'Controller',
      'Server_Response_GetBag',
      JSON.stringify(data)
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

const getMineDelay = async function (account) {
  try {
    const bag = await getBag(mining_account, account, wax.api.rpc, aa_api);
    const land = await getLand(
      federation_account,
      mining_account,
      account,
      wax.api.rpc,
      aa_api
    );
    const params = getBagMiningParams(bag);
    const land_params = getLandMiningParams(land);
    params.delay *= land_params.delay / 10;
    params.difficulty += land_params.difficulty;
    //bott.appendMessage(`params.delay = ${params.delay}`)  
    var minedelay = await getNextMineDelay(
      mining_account,
      account,
      params,
      wax.api.rpc
    );
    //bott.appendMessage(`getMineDelay return = ${minedelay}`) 
    return minedelay;
  } catch (error) {
    return error;
  }
};

async function server_getMineDelay(account) {
  try {
    const minedelay = await getMineDelay(account);
    unityInstance.SendMessage(
      'Controller',
      'Server_Response_GetMineDelay',
      minedelay.toString()
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

const getBagDifficulty = async function (account) {
  try {
    const bag = await getBag(mining_account, account, wax.api.rpc, aa_api);
    const params = getBagMiningParams(bag);
    bott.BagDifficulty = params.difficulty
    return params.difficulty;
  } catch (error) {
    await bott.errorcatch(error)
    return error;
  }
};

const getLandDifficulty = async function (account) {
  try {
    const land = await getLand(
      federation_account,
      mining_account,
      account,
      wax.api.rpc,
      aa_api
    );
    const params = getLandMiningParams(land);
    bott.LandDifficulty = params.difficulty
    return params.difficulty;
  } catch (error) {
    await bott.errorcatch(error)
    return error;
  }
};

const background_mine = async (account) => {
  return new Promise(async (resolve, reject) => {
    if (typeof bott.BagDifficulty !== "number" && typeof bott.LandDifficulty !== "number") {
      const bagDifficulty = await getBagDifficulty(account);
      const landDifficulty = await getLandDifficulty(account);
      const difficulty = bagDifficulty + landDifficulty;
      console.log('difficulty', difficulty);
      console.log('start doWork = ' + Date.now());
      const last_mine_tx = await lastMineTx(mining_account, account, wax.api.rpc);

      doWorkWorker({ mining_account, account, difficulty, last_mine_tx }).then(
        (mine_work) => {
          console.log('end doWork = ' + Date.now());
          resolve(mine_work);
        }
      );
    } else {
      const difficulty = bott.BagDifficulty + bott.LandDifficulty
      console.log('start doWork = ' + Date.now());
      const last_mine_tx = await lastMineTx(mining_account, account, wax.api.rpc);

      doWorkWorker({ mining_account, account, difficulty, last_mine_tx }).then(
        (mine_work) => {
          console.log('end doWork = ' + Date.now());
          resolve(mine_work);
        }
      );
    }
  });
};

async function server_mine(account) {
  try {
    background_mine(account).then((mine_work) => {
      unityInstance.SendMessage(
        'Controller',
        'Server_Response_Mine',
        JSON.stringify(mine_work)
      );
    });
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_claim(data) {
  var mine_work = JSON.parse(data);
  try {
    console.log(`${mine_work.account} Pushing mine results...`);
    const mine_data = {
      miner: mine_work.account,
      nonce: mine_work.rand_str,
    };

    console.log('mine_data', mine_data);

    const actions = [
      {
        account: mining_account,
        name: 'mine',
        authorization: [
          {
            actor: mine_work.account,
            permission: 'active',
          },
        ],
        data: mine_data,
      },
    ];

    wax.api
      .transact(
        {
          actions,
        },
        {
          blocksBehind: 3,
          expireSeconds: 90,
        }
      )
      .then((result) => {
        console.log('result is=', result);

        var amounts = new Map();
        if (result && result.processed) {
          let mined_amount = 0;
          result.processed.action_traces[0].inline_traces.forEach((t) => {
            /*            if (t.act.data.quantity) {
                          const mine_amount = t.act.data.quantity;
                          console.log(`${mine_work.account} Mined ${mine_amount}`);
                          if (amounts.has(t.act.data.to)) {
                            var obStr = amounts.get(t.act.data.to);
                            obStr = obStr.substring(0, obStr.length - 4);
            
                            var nbStr = t.act.data.quantity;
                            nbStr = nbStr.substring(0, nbStr.length - 4);
            
                            var balance = (parseFloat(obStr) + parseFloat(nbStr)).toFixed(
                              4
                            );
            
                            amounts.set(t.act.data.to, balance.toString() + ' TLM');
                          } else {
                            amounts.set(t.act.data.to, t.act.data.quantity);
                          }
                        }
            */
            if (t.act.account === 'alien.worlds' && t.act.name === 'transfer' && t.act.data.to === mine_work.account) {
              const [amount_str] = t.act.data.quantity.split(' ');
              mined_amount += parseFloat(amount_str);
            }
          });

          unityInstance.SendMessage(
            'Controller',
            'Server_Response_Claim',
            //            amounts.get(mine_work.account)
            `${mined_amount.toFixed(4)} TLM`
          );
        }
      }).catch((err) => {
        unityInstance.SendMessage(
          'ErrorHandler',
          'Server_Response_SetErrorData',
          err.message
        );
      });
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_claim2(mining_account1, account, account_permission, mine_data1, hyperion_endpoints) {
  console.log(mining_account1);
  console.log(account);
  console.log(account_permission);
  console.log(mine_data1);
  console.log(hyperion_endpoints);
  try {
    var mine_work = JSON.parse(mine_data1);
    const mine_data = {
      miner: mine_work.account,
      nonce: mine_work.rand_str,
    };
    console.log("Claiming Now");
    const claimData = await claim(mining_account, account, 'active', mine_data, hyperion_endpoints, wax.api);
    console.log("Claim Data" + claimData);
    unityInstance.SendMessage(
      'Controller',
      'Server_Response_Claim',
      claimData.toString()
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_getBounty(transaction_id, account, hyperion_endpoints) {
  try {
    const claimBounty = await getBountyFromTx(transaction_id, account, hyperion_endpoints);
    unityInstance.SendMessage(
      'Controller',
      'Server_Response_GetBounty',
      claimBounty.toString()
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_getBalance(account) {
  try {
    var data = await getBalance(account, wax.api.rpc);
    unityInstance.SendMessage('Controller', 'Server_Response_GetBalance', data);
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_stake(account, planet_name, quantity) {
  try {
    if (planet_name === undefined || planet_name === '')
      throw new Error('missing planet name');
    if (quantity === undefined || quantity === '')
      throw new Error('missing quantity');

    await stake(
      token_account,
      federation_account,
      account,
      planet_name,
      quantity,
      wax.api
    );

    unityInstance.SendMessage(
      'Controller',
      'Server_Response_Stake',
      JSON.stringify({ planet_name: planet_name, quantity: quantity })
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}


async function server_unstake(account, planet_name, quantity) {
  try {
    if (planet_name === undefined || planet_name === '')
      throw new Error('missing planet name');
    if (quantity === undefined || quantity === '')
      throw new Error('missing quantity');

    await unstake(federation_account, "token.worlds", account, planet_name, quantity, wax.api);
    unityInstance.SendMessage(
      'Controller',
      'Server_Response_Unstake',
      JSON.stringify({ planet_name: planet_name, quantity: quantity })
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_getStaked(account) {
  try {
    var data = await getStaked(federation_account, account, wax.api.rpc);
    unityInstance.SendMessage(
      'Controller',
      'Server_Response_GetStaked',
      JSON.stringify(data)
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_getUnstakes(account) {
  try {
    var data = await getUnstakes(federation_account, account, wax.api.rpc);
    unityInstance.SendMessage(
      'Controller',
      'Server_Response_GetUnstakes',
      JSON.stringify(data)
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_refund(account, refund_id) {
  try {
    await refund(federation_account, account, refund_id, wax.api);
    unityInstance.SendMessage(
      'Controller',
      'Server_Response_GetUnstakes',
      refund_id
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_subscribe(account) {
  try {
    console.log('subscribed for account:' + account);
    subscribe(account, function (data) {
      console.log('notification' + data);
      unityInstance.SendMessage(
        'Controller',
        'Server_Response_Notification',
        JSON.stringify(data)
      );
    });
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_getAssets(account, schema) {
  try {
    var assets = await getAssets(account, atomic_endpoint[getRandom(0,atomic_endpoint.length)], collection, schema);    
    var data = { schema: schema, assets: assets };
    unityInstance.SendMessage(
      'Controller',
      'Server_Response_GetAssets',
      JSON.stringify(data)
    );
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function server_setLandCommission(account, land_id, commission) {
  try {
    await setLandCommission(federation_account, account, land_id, commission, wax.api)
    unityInstance.SendMessage('Controller', 'Server_Response_SetLandCommission', JSON.stringify({ land_id, commission }));
  } catch (error) {
    unityInstance.SendMessage(
      'ErrorHandler',
      'Server_Response_SetErrorData',
      error.message
    );
  }
}

async function add_event(Event) {
  try {
    log += Event + '\n';
  }
  finally {
    console.log(log);
  }
}
//Global Error handler
// window.onerror = function(errMsg, url, line, column, error) {
//   log += "Error= " + errMsg;
//   if(!logDownloaded){
//     console.save(log);
//     logDownloaded = true;
//   } 
//   var suppressErrorAlert = true;
//   return suppressErrorAlert;
// };
//Similar to console.log but instead prompts the user to download a log.txt with input inside the file

// console.save = function(data, filename) {
//     if (!data) {
//       console.error('console.save: NO DATA');
//       return;
//     }

//     if (!filename) {
// 	var d = new Date();
//       filename = d.toUTCString() + 'Log.txt';
//     }

//     if (typeof data === 'object') {
//       data = JSON.stringify(data, undefined, 2);
//     }

//     var type = 'text/txt';
//     var blob = new Blob([data], {type:type});
//     var e = document.createEvent('MouseEvents');
//     var a = document.createElement('a');

//     e.initMouseEvent(
//       'click',
//       true,
//       false,
//       window,
//       0,
//       0,
//       0,
//       0,
//       0,
//       false,
//       false,
//       false,
//       false,
//       0,
//       null
//     );

//     a.download = filename;
//     a.href = window.URL.createObjectURL(blob);
//     a.dataset.downloadurl = [type, a.download, a.href].join(':');
//     a.dispatchEvent(e);
//   };

function openURL(url) {
  window.open(url)
}