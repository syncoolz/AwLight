
class panda {
    
  constructor() {    
    // นี่คือธุรกรรมที่ส่ง FROM
    this.cardTransferSlot = {
      actions: [
        {
          account: "nftpandawofg",
          name: "addtoslot",
          authorization: [
            {
              actor: "", // use account that was logged in
              permission: "active",
            },
          ],
          data: { username: "", asset_id: "", number_slot: "" },
        },
      ],
    };

    // นี่คือธุรกรรมที่ส่งจาก Slot
    this.cardTransferOutFromSlot = {
      actions: [
        {
          account: "nftpandawofg",
          name: "remfromslot",
          authorization: [
            {
              actor: "", // use account that was logged in
              permission: "active",
            },
          ],
          data: { username: "", asset_id: "", number_slot: "" },
        },
      ],
    };

    // นี่คือธุรกรรมการจัดส่งการเดินทาง
    this.cardTransferToAdv = {
      actions: [
        {
          account: "nftpandawofg",
          name: "gotoadv",
          authorization: [
            {
              actor: "js4rc.wam", // use account that was logged in
              permission: "active",
            },
          ],
          data: { username: "js4rc.wam", asset_id: "1099571039190" },
        },
      ],
    };

    // นี่คือการทำธุรกรรมระดับขึ้น
    this.LvlTransfer = {
      actions: [
        {
          account: "nftpandawofg",
          name: "lvlup",
          authorization: [
            {
              actor: "", // use account that was logged in
              permission: "active",
            },
          ],
          data: { username: "", asset_id: "" },
        },
      ],
    };

    // นี่คือธุรกรรมการซื้อสล็อต
    this.slotTransBay = {
      actions: [
        {
          account: "nftpandabamb",
          name: "transfer",
          authorization: [
            {
              actor: "", // use account that was logged in
              permission: "active",
            },
          ],
          data: {
            from: "",
            to: "nftpandawofg",
            quantity: "",
            memo: "bayslot",
          },
        },
      ],
    };

    // นี่คือธุรกรรมการปักหลัก NTF
    this.stakeTransNft = {
      actions: [
        {
          account: "nftpandabamb",
          name: "transfer",
          authorization: [
            {
              actor: "", // use account that was logged in
              permission: "active",
            },
          ],
          data: {
            from: "",
            to: "nftpandawofg",
            quantity: "",
            memo: "",
          },
        },
      ],
    };

    // นี่คือธุรกรรมของรางวัล
    this.rewardTrans = {
      actions: [
        {
          account: "nftpandawofg",
          name: "printrand",
          authorization: [
            {
              actor: "js4rc.wam", // use account that was logged in
              permission: "active",
            },
          ],
          data: {
            username: "js4rc.wam",
            assoc_id: "1099571039188",
            signing_value: "39604703696176",
          },
        },
      ],
    };
    // นี่คือธุรกรรมการถอนปักหลัก NTF

    this.getref = {
      actions: [
        {
          account: "nftpandawofg",
          name: "getrefer",
          authorization: [
            {
              actor: "js4rc.wam", // use account that was logged in
              permission: "active",
            },
          ],
          data: { username: "js4rc.wam" },
        },
      ],
    };

    this.unstakeTransNft = {
      actions: [
        {
          account: "nftpandawofg",
          name: "unstakenft",
          authorization: [
            {
              actor: "", // use account that was logged in
              permission: "active",
            },
          ],
          data: { username: "", asset_id: "", bam_sum: "" },
        },
      ],
    };
  }
  async GOadventure(Asset_panda) {
    try {
      bott.appendMessage(`Status : Sent Panda to Adventure..`);
      console.log(`Sent Panda to Adventure..`);

      const actions = this.rewardTrans.actions;

      let result = await wax.api.transact(
        {
          actions,
        },
        {
          blocksBehind: 3,
          expireSeconds: 90,
        }
      );
      if (result && result.processed) {
        bott.appendMessage(`Status : Sent Panda to Adventure Successful`);
        if (document.getElementById("box-message1")) {
          bott.appendMessage(`Status : Sent Panda to Adventure Successful`, 1);
        }
        return `Complete Sent Panda to Adventure `;
      }
      return 0;
    } catch (error) {
      bott.appendMessage(`Status : You Sent Panda to Adventure Failed`);
      throw error;
    }
  }

  async getModalRewardInfo() {
    //this.props.toggleIsFetchingTop(true);
    try {
      // const rpcc = new JsonRpc(`${'https'}://${'chain.wax.io'}`);
      const results = await eos_rpc.get_table_rows({
        json: true,
        code: "nftpandawofg", // contract who owns the table
        scope: "nftpandawofg", // scope of the table
        table: "nftsongamec", // name of the table as specified by the contract abi
        index_position: 1,
        limit: 1000,
        lower_bound: "1099571039190",
        upper_bound: "1099571039190",
        reverse: false,
        show_payer: false,
      });
      const wasLogin = results.rows[0];
      bott.appendMessage(`Status : result = ${wasLogin}`);
      console.log(wasLogin);
    } catch (err) {
      bott.appendMessage(`Status : getModalRewardInfo Failed`);
      console.log(err);
    }
  }
  async userCheck() {
    try {
      // const activeUser = this.props.ual.activeUser;
      // const accountName = await activeUser.getAccountName();
      // const rpcc = new JsonRpc(`${'https'}://${'chain.wax.io'}`);
      const results = await eos_rpc.get_table_rows({
        json: true,
        code: "nftpandawofg", // contract who owns the table
        scope: "nftpandawofg", //this.state.accountName,   // scope of the table
        table: "usersnew", // name of the table as specified by the contract abi
        limit: 1,
        index_position: 1,
        lower_bound: "js4rc.wam",
        upper_bound: "js4rc.wam",
        reverse: false,
        show_payer: false,
      });
      // const originRowUser = results.rows;
      console.log(results);

      // this.setState({
      //     formInfo: originRowUser
      // })
    } catch (e) {
      //console.log(e.message)
      console.warn(e);
      this.setState({
        hasError: true,
        errorText: e.message,
      });
      console.log("\nCaught exception: " + e);
    }
  }
}
