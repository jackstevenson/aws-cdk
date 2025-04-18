"use strict";
/* eslint-disable no-console */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = getEnv;
exports.log = log;
exports.withRetries = withRetries;
exports.parseJsonPayload = parseJsonPayload;
function getEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`The environment variable "${name}" is not defined`);
    }
    return value;
}
function log(title, ...args) {
    console.log('[provider-framework]', title, ...args.map(x => typeof (x) === 'object' ? JSON.stringify(x, undefined, 2) : x));
}
function withRetries(options, fn) {
    return async (...xs) => {
        let attempts = options.attempts;
        let ms = options.sleep;
        while (true) {
            try {
                return await fn(...xs);
            }
            catch (e) {
                if (attempts-- <= 0) {
                    throw e;
                }
                await sleep(Math.floor(Math.random() * ms));
                ms *= 2;
            }
        }
    };
}
async function sleep(ms) {
    return new Promise((ok) => setTimeout(ok, ms));
}
function parseJsonPayload(payload) {
    // sdk v3 returns payloads in Uint8Array, either it or a string or Buffer
    // can be cast into a buffer and then decoded.
    const text = new TextDecoder().decode(Buffer.from(payload ?? ''));
    if (!text) {
        return {};
    }
    try {
        return JSON.parse(text);
    }
    catch {
        throw new Error(`return values from user-handlers must be JSON objects. got: "${text}"`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtCQUErQjs7QUFFL0Isd0JBTUM7QUFFRCxrQkFFQztBQVNELGtDQWdCQztBQU1ELDRDQVVDO0FBbkRELFNBQWdCLE1BQU0sQ0FBQyxJQUFZO0lBQ2pDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFnQixHQUFHLENBQUMsS0FBVSxFQUFFLEdBQUcsSUFBVztJQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0gsQ0FBQztBQVNELFNBQWdCLFdBQVcsQ0FBMEIsT0FBcUIsRUFBRSxFQUE0QjtJQUN0RyxPQUFPLEtBQUssRUFBRSxHQUFHLEVBQUssRUFBRSxFQUFFO1FBQ3hCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUN2QixPQUFPLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBSSxDQUFDO2dCQUNILE9BQU8sTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN6QixDQUFDO1lBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDWCxJQUFJLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUNwQixNQUFNLENBQUMsQ0FBQztnQkFDVixDQUFDO2dCQUNELE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDVixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxLQUFLLFVBQVUsS0FBSyxDQUFDLEVBQVU7SUFDN0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxPQUF3RDtJQUN2Rix5RUFBeUU7SUFDekUsOENBQThDO0lBQzlDLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQUMsT0FBTyxFQUFHLENBQUM7SUFBQyxDQUFDO0lBQzFCLElBQUksQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBQUMsTUFBTSxDQUFDO1FBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRUFBZ0UsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUMzRixDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVudihuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCB2YWx1ZSA9IHByb2Nlc3MuZW52W25hbWVdO1xuICBpZiAoIXZhbHVlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgZW52aXJvbm1lbnQgdmFyaWFibGUgXCIke25hbWV9XCIgaXMgbm90IGRlZmluZWRgKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2codGl0bGU6IGFueSwgLi4uYXJnczogYW55W10pIHtcbiAgY29uc29sZS5sb2coJ1twcm92aWRlci1mcmFtZXdvcmtdJywgdGl0bGUsIC4uLmFyZ3MubWFwKHggPT4gdHlwZW9mKHgpID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KHgsIHVuZGVmaW5lZCwgMikgOiB4KSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmV0cnlPcHRpb25zIHtcbiAgLyoqIEhvdyBtYW55IHJldHJpZXMgKHdpbGwgYXQgbGVhc3QgdHJ5IG9uY2UpICovXG4gIHJlYWRvbmx5IGF0dGVtcHRzOiBudW1iZXI7XG4gIC8qKiBTbGVlcCBiYXNlLCBpbiBtcyAqL1xuICByZWFkb25seSBzbGVlcDogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2l0aFJldHJpZXM8QSBleHRlbmRzIEFycmF5PGFueT4sIEI+KG9wdGlvbnM6IFJldHJ5T3B0aW9ucywgZm46ICguLi54czogQSkgPT4gUHJvbWlzZTxCPik6ICguLi54czogQSkgPT4gUHJvbWlzZTxCPiB7XG4gIHJldHVybiBhc3luYyAoLi4ueHM6IEEpID0+IHtcbiAgICBsZXQgYXR0ZW1wdHMgPSBvcHRpb25zLmF0dGVtcHRzO1xuICAgIGxldCBtcyA9IG9wdGlvbnMuc2xlZXA7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBhd2FpdCBmbiguLi54cyk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChhdHRlbXB0cy0tIDw9IDApIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHNsZWVwKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1zKSk7XG4gICAgICAgIG1zICo9IDI7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiBzbGVlcChtczogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgob2spID0+IHNldFRpbWVvdXQob2ssIG1zKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUpzb25QYXlsb2FkKHBheWxvYWQ6IHN0cmluZyB8IEJ1ZmZlciB8IFVpbnQ4QXJyYXkgfCB1bmRlZmluZWQgfCBudWxsKTogYW55IHtcbiAgLy8gc2RrIHYzIHJldHVybnMgcGF5bG9hZHMgaW4gVWludDhBcnJheSwgZWl0aGVyIGl0IG9yIGEgc3RyaW5nIG9yIEJ1ZmZlclxuICAvLyBjYW4gYmUgY2FzdCBpbnRvIGEgYnVmZmVyIGFuZCB0aGVuIGRlY29kZWQuXG4gIGNvbnN0IHRleHQgPSBuZXcgVGV4dERlY29kZXIoKS5kZWNvZGUoQnVmZmVyLmZyb20ocGF5bG9hZCA/PyAnJykpO1xuICBpZiAoIXRleHQpIHsgcmV0dXJuIHsgfTsgfVxuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHRleHQpO1xuICB9IGNhdGNoIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYHJldHVybiB2YWx1ZXMgZnJvbSB1c2VyLWhhbmRsZXJzIG11c3QgYmUgSlNPTiBvYmplY3RzLiBnb3Q6IFwiJHt0ZXh0fVwiYCk7XG4gIH1cbn1cbiJdfQ==