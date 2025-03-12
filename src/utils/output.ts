import { PassThrough } from 'stream';

/**
 * 输出
 */
export class Output {
  private stream = new PassThrough();
  private output_as_stream = true;
  private outputable = true

  constructor(output_as_stream: boolean = true) {
    this.output_as_stream = output_as_stream;
  }

  /**
   * 获取流
   * @returns
   */
  get() {
    return this.stream;
  }

  open() {
    this.outputable = true
  }

  close() {
    this.outputable = false
  }

  /**
   * 是否输出流
   * @returns
   */
  isOutputAsStream() {
    return this.output_as_stream;
  }

  /**
   * 管道流
   * @param res
   */
  pipe(res: any) {
    this.stream.pipe(res);
  }

  /**
   * 关闭流
   */
  end() {
    this.stream.end();
  }

  /**
   * 是否可写入
   * @returns
   */
  isWriteable() {
    return this.stream.writable;
  }

  /**
   * 写入
   * @param data
   */
  write(data: string) {
    if (!this.outputable) {
      return 
    }
    if (this.output_as_stream) {
      this.stream.write('data: ' + data + '\n\n');
    }
  }

  /**
   * json格式
   * @param data
   */
  json(data: any) {
    if (!this.outputable) {
      return 
    }
    if (!this.output_as_stream) {
      this.stream.write(JSON.stringify(data));
    }
  }

  /**
   * 开始控制输出
   * @param ctrl
   * @returns
   */
  startCtrl(ctrl: string) {
    if (!this.outputable) {
      return 
    }
    if (this.output_as_stream) {
      this.stream.write('data: ```' + ctrl + '\n\n\n');
    }
  }

  /**
   * 结束控制输出
   */
  endCtrl() {
    if (!this.outputable) {
      return 
    }
    if (this.output_as_stream) {
      this.stream.write('data: \n```\n\n\n');
    }
  }
}
