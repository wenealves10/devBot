const checkCommandName = /^#name(\s+)([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+)(\s+)(\d{2})(\s+)([A-Za-z#+-./]+)$/gi;
const checkCommandNumber = /^#add(\s+)(\d{12})$/gi;
const getData = (data: string) => String(data.match(/\S+/gis)).split(",");
const getNumber = (data: string) => data.match(/\d+/gis);
const getStringClient = (client: any, search: string) =>
  String(client).split(search)[0];

export {
  checkCommandName,
  checkCommandNumber,
  getNumber,
  getData,
  getStringClient,
};
