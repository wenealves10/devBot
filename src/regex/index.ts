const checkCommandName = /^#name(\s+[\w\W]+)(\s+\d{2})(\s+[\w\W]+\s*)$/gi;
const getData = (data: string) => String(data.match(/\S+/gis)).split(",");
const getStringClient = (client: any, search: string) =>
  String(client).split(search)[0];

export { checkCommandName, getData, getStringClient };
