const EXT = "json";

const METHOD_NAMES = ["getApicClass", "topSystems"];

const APIC_PATHS = {
  LOGIN: "aaaLogin",
  CLASS: "class"
};

// todo take out telemetry related properties
const APIC_API = {
  CLASSES: {
    TOP_SYSTEM: "topSystem",
    FABRIC_NODE: "fabricNode",
    FAULTS_INST: "faultInst",
    USER: "aaaUser",
    TENANT: "fvTenant",
    VRF: "fvCtx",
    EPG: "fvAEPg",
    APP_PROFILE: "fvAp",
    MGMT_IN_BAND: "mgmtInB",
    MO_COUNT: "moCount"
  },
  DN: {
    APP_PLUGIN: "node/mo/pluginContr/plugin-Cisco_ElamAssistant"
  },
  PROPERTIES: {
    TOTALCNT: "totalCount",
    IMDATA: "imdata",
    ATTRIBUTES: "attributes",
    CHILDREN: "children"
  },
  ATTRIBUTES: {
    ADMIN_ST: "adminSt",
    DESCR: "descr",
    CODE: "code",
    COUNT: "count",
    NAME: "name",
    DN: "dn",
    T_DN: "tDn",
    MO_DN: "moDn",
    KEY: "key",
    VALUE: "value",
    MATCH_EXPRESSION: "matchExpression",
    PWD: "pwd",
    SUBNET_IP: "subnetIp",
    STATUS: "status",
    TEXT: "text",
    TOKEN: "token"
  },
  VALUES: {
    ENABLED: "enabled",
    DISABLED: "disabled"
  },
  OPTIONS: {
    QUERY_TARGET: "query-target",
    TARGET_SUBTREE_CLASS: "target-subtree-class",
    RSP_SUBTREE: "rsp-subtree",
    RSP_SUBTREE_INCLUDE: "rsp-subtree-include"
  },
  QUERY_TARGET: {
    SELF: "self",
    CHILDREN: "children",
    SUBTREE: "subtree"
  },
  RSP_SUBTREE: {
    CHILDREN: "children",
    FULL: "full"
  },
  RSP_SUBTREE_INCLUDE: {
    OPTIONS: {
      COUNT: "count",
      NO_SCOPED: "no-scoped",
      REQUIRED: "required"
    },
    CATEGORIES: {
      FAULTS: "faults"
    }
  }
};

export { EXT, METHOD_NAMES, APIC_PATHS, APIC_API };
