import { deepCopy } from "./utils";

export type CancelDispatch = {
  (): void;
};

/**
 *
 */
export class Dispatcher<
  EventMap extends { [type: string]: any },
  Context extends Record<string, any> = any
> {
  #hub = new EventTarget();
  #context: Context;

  constructor(init: { context: { (): Context } }) {
    this.#context = init.context();
  }

  /**
   * Listens for the specific event.
   * @param event The event name as defined in the EventMap
   * @param handler The event handler. The payload and the context will be passed into this callback function.
   * @returns A function to remomve the handler from receiving further events.
   */
  on<EventType extends keyof EventMap>(
    event: EventType,
    handler: { (data: EventMap[EventType], context: Context): void }
  ): CancelDispatch {
    const wrapHandler = (event: Event) => {
      const { detail } = event as CustomEvent<EventMap[EventType]>;
      handler(detail, deepCopy(this.#context));
    };
    this.#hub.addEventListener(event as string, wrapHandler);
    return () => {
      this.#hub.removeEventListener(event as string, wrapHandler);
    };
  }

  dispatch<EventType extends keyof EventMap>(
    event: EventType,
    data: EventMap[EventType]
  ) {
    this.#hub.dispatchEvent(
      new CustomEvent(event as string, {
        detail: { context: this.#context, payload: data },
      })
    );
  }
}
