const { getDaemon } = require("../../build");
const { on_block } = require("../../build/api/ws/full_node");

const timeout = 120000;

test(
  "on_block",
  (done) => {
    const runAsyncTest = async () => {
      const daemon = getDaemon();
      await daemon.connect();

      let timer = setTimeout(async () => {
        await daemon.close();
        done("Timed out");
        timer = null;
      }, timeout);

      let count = 0;
      const unsubscribe = await on_block(daemon, async (event) => {
        if (timer === null) {
          return;
        }

        expect(event.command).toBe("block");
        // console.log(event);

        count++;
        if (count >= 2) {
          clearTimeout(timer);
          timer = null;

          await daemon.close();
          done();
        }
      });
    };

    runAsyncTest();
  },
  timeout,
);
