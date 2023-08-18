import { autowired, IPlugin, IServiceManager } from '@/core';
import {
  ICSS,
  IDOM,
  registerCmds,
  registerServices,
} from '@/recorder/common/protocol-api';
import AgentPrototype, { QualifiedName, splitQualifiedName } from './agent';

export default class ProtocolPlugin implements IPlugin {
  map: { [key: string]: AgentPrototype } = {};

  @autowired(IServiceManager)
  serviceManager: IServiceManager;

  @autowired(ICSS)
  css: ICSS;

  @autowired(IDOM)
  dom: IDOM;

  async registerSrv() {
    registerCmds(this);
    registerServices(this.serviceManager, this);
  }

  async init() {
    console.info(this.css, this.dom);
    // this.dom.getFrameOwner({ frameId: window.__get_frame_id() });
  }

  registerCommand(cmd: QualifiedName) {
    const [domain, methodName] = splitQualifiedName(cmd);
    if (!this.map[domain]) {
      this.map[domain] = new AgentPrototype(domain);
    }
    this.map[domain].registerCommand(methodName);
  }

  getDomain(domain: string) {
    return this.map[domain];
  }
}
