import { Request } from '../request'
import { Resolver } from '../resolver'

var io = require('socket.io-client')

class WebsocketRequest extends Request {
  /**
   * JWT token.
   *
   * @type {string}
   */
  private token: string;

  /**
   * Dispatch request.
   */
  dispatch(): void {
    this.update(304);

    let vehicles = this.listener.vehicles;

    this.request.on('connect', () => {
      console.log('connected', vehicles);
    })
    .emit('authenticate', {token: this.token})

    this.request.on('authenticated', () => {
      console.log('authenticated');
    })

    this.request.onAny((socketEvent, response) => {
      let d = response.data;
      let event = socketEvent.split(":");
      let eventType = event[0];

      if (response.status == 200) {
        if(eventType == "track") {
          this.locate(d)
        } else if(eventType == "status") {
          this.status({
            event: socketEvent,
            data: d
          })
        }
      }

      this.update(response.status)
    });
  }

  /**
   * Send request.
   */
  send() {
    this.update(304);
  }

  /**
   * Set request endpoint.
   *
   * @param  {object} options
   * @return {this}
   */
  to(options: any = {}): this {
    this.token = options.token;
    this.request = io(options.url);

    return this;
  }
}

export class Websocket extends Resolver {
  /**
   * Make websocket request.
   *
   * @param {object} listener
   * @return {Request}
   */
  make(listener: any) {
    let request = new WebsocketRequest(listener);

    return request.to(this.options);
  }
}
