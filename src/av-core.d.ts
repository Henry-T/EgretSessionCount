
declare module AV {
  function initialize(id:string, key:string):void;

  module Object {
    function extend(name:string);
    function save();
    function get();
  }

  interface Query_Static {
    new(m: any): Query_Instance;
  }
  interface Query_Instance {
    get(key:any, funs:any);
  }
  var Query: Query_Static;
}
