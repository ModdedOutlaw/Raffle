async function fetchRaffleEntries() {
  const outputRaffleEntries = document.querySelector('.outputRaffleEntries');
  const outputRaffleDates = document.querySelector('.outputRaffleDates');
  const raffleStart = parseInt("1646187252500");
  const raffleEnd = new Date('MARCH 8, 22 12:00:00 GMT+00:00');
  const winningNumber = 0;

  outputRaffleEntries.innerHTML = "";
  outputRaffleDates.innerHTML = "";

  const urlRaffleEntries = "https://wax.api.atomicassets.io/atomicassets/v1/transfers?recipient=moddedwax.gm&schema_name=miners&collection_name=upliftworld&after=" + raffleStart + "&page=1&limit=100&order=desc&sort=created";

  const response = await fetch(urlRaffleEntries).then(function (res) {
    return res.json()
  }).then(function (data) {

    let list = data.data;
    //console.log(list);
    raffleNumber = 1;
    for (let totalEntries = list.length - 1; totalEntries >= 0; totalEntries--) {

      var ms = list[totalEntries].created_at_time;
      var time_transfered = new Date(parseInt(list[totalEntries].created_at_time));
      if (ms > raffleStart && ms < raffleEnd) {
        if (list[totalEntries].assets.length >= 2) {
          transferAmount = list[totalEntries].assets.length;
          let assetIndex = 0;
          while (transferAmount > 0) {
            if (list[totalEntries].assets[0].template.template_id == "197290" || list[totalEntries].assets[0].template.template_id == "196981" ||
              list[totalEntries].assets[assetIndex].template.template_id == "196818" || list[totalEntries].assets[assetIndex].template.template_id == "181602" ||
              list[totalEntries].assets[assetIndex].template.template_id == "181594") {
              //console.log("Common Miner")
            }

            if (list[totalEntries].assets[assetIndex].data.rarity == "Common" || list[totalEntries].assets[assetIndex].data.rarity == "Uncommon") {
              outputRaffleEntries.innerHTML += '<tr ><td><b>' + raffleNumber + '.</td> </b><td>' + list[totalEntries].sender_name + '</td> <td class = "time"> ' + time_transfered + '</tr>';
              raffleNumber++;
            }
            assetIndex++;
            transferAmount--;
          }
        } else {
          if (list[totalEntries].assets[0].template.template_id == "197290" || list[totalEntries].assets[0].template.template_id == "196981" ||
            list[totalEntries].assets[assetIndex].template.template_id == "196818" || list[totalEntries].assets[assetIndex].template.template_id == "181602" ||
            list[totalEntries].assets[assetIndex].template.template_id == "181594") {
            //console.log("Common Miner")
          }


          //console.log(list[totalEntries].assets[0].template.template_id);

          if (list[totalEntries].assets[0].data.rarity == "Common" || list[totalEntries].assets[0].data.rarity == "Uncommon") {
            outputRaffleEntries.innerHTML += '<tr ><td><b>' + raffleNumber + '.</td> </b><td>' + list[totalEntries].sender_name + '</td> <td class = "time"> ' + time_transfered + '</tr>';
            raffleNumber++;
          }
        }
      }
    }

  }).catch(function (error) {
    console.log(error);

  })

}

async function fetchUpliftiumStats() {

  const urlUpliftiumSales = "https://wax.api.atomicassets.io/atomicmarket/v1/prices/sales/days?collection_name=upliftium.hi&schema_name=upliftium";

  const outputUpliftiumSales = document.querySelector('.outputUpliftiumSales');

  const json = await this.getJSON(urlUpliftiumSales);  // command waits until completion

  outputUpliftiumSales.innerHTML = "";

  //console.log(json.data);            // hello is now available

  console.log("Upliftium Stats ...");
  console.log("Median = " + json.data[0].median / 100000000);


}

async function fetchCommonMinerPrice() {

  const urlCommonMinerPriceBlank = "https://wax.api.atomicassets.io/atomicmarket/v1/prices/sales/days?collection_name=upliftworld&schema_name=miners&template_id=";
  const outputCommonMinerPrice = document.querySelector('.outputCommonMinerPrice');

  const commonMinerArray = [197290, 196981, 196818, 181602, 181594]

  const minerUrlArray = [];

  outputCommonMinerPrice.innerHTML = "";

  let i = 0;

  commonMinerArray.forEach(element => {
    minerUrlArray[i] = urlCommonMinerPriceBlank.concat(element);


    i++;
  });

  i = 0;

  minerUrlArray.forEach(element => {

    fetch(element).then(function (res) {
      return res.json()
    }).then(function (data) {

      let list = data.data;

      console.log("Median Price Common Miner #" + commonMinerArray[i] + " = " + list[0].median / 100000000);
      i++;

    }).catch(function (error) {
      console.log(error);

    })
  });

}

async function getJSON(url) {
  return fetch(url)
      .then((response)=>response.json())
      .then((responseJson)=>{return responseJson});
}