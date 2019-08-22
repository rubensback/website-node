const BaseControl = require("../controller/baseControl");
const baseControl = new BaseControl();

module.exports = (app) => {

    const rotasBase = BaseControl.rotas();

    app.get(rotasBase.home,baseControl.home());
}
