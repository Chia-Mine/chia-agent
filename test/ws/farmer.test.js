const {getDaemon} = require("../../build");
const {on_new_signage_point} = require("../../build/api/ws/farmer");

const timeout = 60000;

test("new_signage_point", (done) => {
  const runAsyncTest = async () => {
    const daemon = getDaemon();
    await daemon.connect();
  
    let timer = setTimeout(async () => {
      await daemon.close();
      done("Timed out");
      timer = null;
    }, timeout);
    
    const unsubscribe = await on_new_signage_point(daemon, async (event) => {
      if(timer === null){
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
}, timeout + 5000);
