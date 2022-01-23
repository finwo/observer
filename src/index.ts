const noop = () => {};

export default observer;
export function observer<T extends {[index:string|symbol]:any}>(target: T, handler: Function = noop): ProxyHandler<T> {
    if (typeof handler !== 'function') {
        throw new TypeError('Expecting handler to be a callable function.');
    }
    return new Proxy(target, {
        get: (target, prop, receiver) => {
            const value: any = target[prop];
            if (value && ('object' === typeof value)) {
                return observer(value, handler.bind(null, {target, prop, value, oldValue:undefined, receiver}));
            }
            return value;
        },
        set: (target, prop, value, receiver) => {
            const oldValue = Reflect.get(target, prop, receiver);
            if (oldValue === value) {
                return true;
            }
            const response = Reflect.set(target, prop, value, receiver);
            handler({target, prop, value, oldValue, receiver});
            return response;
        },
        deleteProperty: (target, prop: string | symbol) => {
            if (!(prop in target)) return true;
            const oldValue = Reflect.get(target, prop);
            const response = Reflect.deleteProperty(target, prop);
            handler({target, prop, value:undefined, oldValue, receiver:undefined});
            return response;
        }
    });
}
