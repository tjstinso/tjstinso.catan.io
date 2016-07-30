export function createRules(numberRules, pieceRules, dockRules) {
  let obj;
  obj = numberRules(obj, numberRules);
  obj = pieceRules(obj, pieceRules);
  obj = dockRules(obj, dockRules);
  return obj;
}

function numberRules(rule, ruleObject) {

}

function pieceRules(rule, ruleObject) {

}

function dockRules(rule, ruleObject) {

}
