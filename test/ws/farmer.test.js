const { getDaemon } = require("../../build");
const { on_new_signage_point } = require("../../build/api/ws/farmer");
const { get_harvesters } = require("../../build/api/rpc/farmer");

const timeout = 60000;

test(
  "new_signage_point",
  (done) => {
    const runAsyncTest = async () => {
      const daemon = getDaemon();
      await daemon.connect();

      let timer = setTimeout(async () => {
        await daemon.close();
        done("Timed out");
        timer = null;
      }, timeout);

      const unsubscribe = await on_new_signage_point(daemon, async (event) => {
        if (timer === null) {
          return;
        }

        expect(event.command).toBe("new_signage_point");
        // console.log(event);

        await daemon.close();
        clearTimeout(timer);
        timer = null;
        done();
      });
    };

    runAsyncTest();
  },
  timeout + 5000,
);

test(
  "get_harvesters",
  (done) => {
    const runAsyncTest = async () => {
      const daemon = getDaemon();
      await daemon.connect();

      let timer = setTimeout(async () => {
        await daemon.close();
        done("Timed out");
        timer = null;
      }, timeout);

      const res = await get_harvesters(daemon);

      expect(res.origin).toBe("chia_farmer");
      expect(res.ack).toBeTruthy();
      expect(res.command).toBe("get_harvesters");
      expect(Array.isArray(res.data.harvesters)).toBeTruthy();
      // console.log(res);

      await daemon.close();
      clearTimeout(timer);
      timer = null;
      done();
    };

    runAsyncTest();
  },
  timeout + 5000,
);
