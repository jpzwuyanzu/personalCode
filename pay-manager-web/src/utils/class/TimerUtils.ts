type IdType = string;
interface TimeoutQueueItem {
  id: IdType;
  cb: () => void;
  path?: string;
  byPath?: boolean;
}

/**
 * 定时器管理
 */
class TimerUtils {
  static setTimeoutQueue: TimeoutQueueItem[] = [];

  static timeWorker: Record<IdType, NodeJS.Timeout> = {};

  /**
   * 添加定时任务
   * @param id
   * @param cb
   * @param byPath
   * @param path
   */
  static addSetTimeout(
    id: IdType,
    cb: () => void,
    byPath = false,
    path = window.location.pathname,
  ) {
    if (!this.setTimeoutQueue.filter((item) => item.id === id).length) {
      this.setTimeoutQueue.push({ id, cb, byPath, path });
    }
    return this;
  }

  /**
   * 根据id清理定时任务
   * @param id
   */
  static delSetTimeout(id: IdType) {
    this.setTimeoutQueue = this.setTimeoutQueue.filter(
      (item) => item.id !== id,
    );
  }

  /**
   * 开始执行定时任务
   * @param id
   * @param time
   * @param once
   */
  static startSetTimeout(
    id: IdType,
    time: number = 1000,
    once: boolean = false,
  ) {
    const currentSetTimeout: any = this.setTimeoutQueue.find(
      (item) => item.id === id,
    );

    if (currentSetTimeout) {
      const execute = (fn: () => void) => {
        if (this.timeWorker[id]) clearTimeout(this.timeWorker[id]);
        this.timeWorker[id] = setTimeout(() => {
          // 是否关联当前的path
          if (currentSetTimeout.byPath) {
            if (window.location.pathname.includes(currentSetTimeout?.path)) {
              fn();
            }
          } else {
            fn();
          }
          if (!once) {
            execute(fn);
          }
        }, time);
      };
      execute(currentSetTimeout.cb);
    }
  }

  /**
   * 停止定时任务
   * @param id
   */
  static stopSetTimeout(id: string) {
    if (!id) {
      this.setTimeoutQueue = [];
      Object.keys(this.timeWorker).forEach((key) => {
        clearTimeout(this.timeWorker[key]);
        delete this.timeWorker[key];
      });
      return this;
    }
    this.setTimeoutQueue = this.setTimeoutQueue.filter(
      (item) => item.id !== id,
    );
    Object.keys(this.timeWorker).forEach((key) => {
      if (key === id) {
        clearTimeout(this.timeWorker[key]);
        delete this.timeWorker[key];
      }
    });
    return this;
  }
}

export default TimerUtils;
