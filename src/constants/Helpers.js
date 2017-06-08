// Numbers
let numeral = require("numeral");
require("numeral/locales/pt-br");

numeral.locale('pt-br');

// Dates & Timezones
let moment = require("moment");
require("moment/locale/pt-br");

moment.locale('pt-BR');

export default {
  Number: {
    to_currency: (number) => {
      return numeral( Math.round(number) ).format('$0,0.00')
    }
  },
  Timezone: {
    agotime: (date) => {
      return moment(date).fromNow()
    }
  },
}
