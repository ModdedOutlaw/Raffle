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
      
      //console.log("Median Price Common Miner #" + commonMinerArray[i] + " = " + list[0].median / 100000000);
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


async function fetchCommonMinerSales() {

  const urlCommonMinerSalesBlankStart = "https://wax.api.atomicassets.io/atomicmarket/v1/sales?state=1&collection_name=upliftworld&schema_name=miners&template_id="
  const urlCommonMinerSalesBlankEnd = "&page=1&limit=5&order=asc&sort=price";
  
  const outputCommonMinerSales = document.querySelector('.outputCommonMinerSales');

  const commonMinerArray = [197290, 196981, 196818, 181602, 181594]

  const minerUrlArray = [];

  outputCommonMinerSales.innerHTML = "";

  let i = 0;

  commonMinerArray.forEach(element => {
    minerUrlArray[i] = urlCommonMinerSalesBlankStart.concat(element);
    minerUrlArray[i] = minerUrlArray[i].concat(urlCommonMinerSalesBlankEnd);
    i++;
  });

  i = 0;

  //console.log(minerUrlArray);

  const imgBegin = "AboutPageAssets/images/";
  const saleLink = "https://wax.atomichub.io/market/sale/";

  outputCommonMinerSales.innerHTML += "<table>";
  minerUrlArray.forEach(element => {

    fetch(element).then(function (res) {
      return res.json()
    }).then(function (data) {

      let list = data.data;

      //console.log(list);

      //console.log(list[0].sale_id);

      let imgUrl = imgBegin.concat(list[0].assets[0].template.immutable_data.img);

      let saleUrl = saleLink.concat(list[0].sale_id)

      outputCommonMinerSales.innerHTML += '<center><br><tr><td><img src="' + imgUrl 
      + '.jpeg" style="display: in-line;margin-left: auto;margin-right: auto;width: 50%;"></td><br><td>  <a href = "' + saleUrl 
      + '" target = "_blank">Current Lowest Price = ' + list[0].listing_price/100000000 
      +'</a></td></tr></center>';
      i++;

    }).catch(function (error) {
      console.log(error);

    })
  });
  outputCommonMinerSales.innerHTML += "</table>";


}


async function fetchLandKeySales() {

  const urlLandKeySalesStart = "https://wax.api.atomicassets.io/atomicmarket/v1/sales?state=1&collection_name=upliftworld&schema_name=keys&template_id="
  const urlLandKeySalesBlankEnd = "&page=1&limit=100&order=asc&sort=price";
  
  const outputLandKeySales = document.querySelector('.outputLandKeySales');

  const arrayLandKeys = [172596,110840,121669,172599,161772,161765]

  const landKeyUrlArray = [];

  outputLandKeySales.innerHTML = "";

  let i = 0;

  arrayLandKeys.forEach(element => {
    landKeyUrlArray[i] = urlLandKeySalesStart.concat(element);
    landKeyUrlArray[i] = landKeyUrlArray[i].concat(urlLandKeySalesBlankEnd);
    i++;
  });

  i = 0;

  console.log(landKeyUrlArray);

  const imgBegin = "AboutPageAssets/images/";
  const saleLink = "https://wax.atomichub.io/market/sale/";

  outputLandKeySales.innerHTML += "<table>";
  landKeyUrlArray.forEach(element => {

    fetch(element).then(function (res) {
      return res.json()
    }).then(function (data) {

      let list = data.data;
      let Upluft = 0;
      let Londom = 0;
      let chikinKaah = 0;

      list.forEach(element => {
        //console.log(element.assets[0].immutable_data.world);

        if(element.assets[0].immutable_data.world == "Londom" && Londom == 0){
          let saleUrl = saleLink.concat(element.sale_id)
          console.log(element.sale_id);
          console.log(element.assets[0].immutable_data.world);
          console.log(saleUrl);
          Londom = 1;
        }
        if(element.assets[0].immutable_data.world == "Upluft" && Upluft == 0){
          let saleUrl = saleLink.concat(element.sale_id)
          console.log(element.sale_id);
          console.log(element.assets[0].immutable_data.world);
          console.log(saleUrl);
          Upluft = 1;
        }
        if(element.assets[0].immutable_data.world == "chikin-kaah" && 	chikinKaah == 0){
          let saleUrl = saleLink.concat(element.sale_id)
          console.log(element.sale_id);
          console.log(element.assets[0].immutable_data.world);
          console.log(saleUrl);
          chikinKaah = 1;
        }


      });
      //console.log(list[0].sale_id);
      //console.log(list[0].assets[0].immutable_data.world);

      let imgUrl = imgBegin.concat(list[0].assets[0].template.immutable_data.img);

      let saleUrl = saleLink.concat(list[0].sale_id)

      outputLandKeySales.innerHTML += '<center><br><tr><td><img src="' + imgUrl 
      + '.jpeg" style="display: in-line;margin-left: auto;margin-right: auto;width: 20%;"></td><br><td>  <a href = "' + saleUrl 
      + '" target = "_blank">Current Lowest Price = ' + list[0].listing_price/100000000 
      +'</a></td></tr></center>';
      i++;

    }).catch(function (error) {
      console.log(error);

    })
  });
  outputLandKeySales.innerHTML += "</table>";


}