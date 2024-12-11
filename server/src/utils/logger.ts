import styles from 'ansi-styles';

export default class Logger {
    scope: string;
    constructor(scope: string) {
        this.scope = scope;
    }

    private print(message: string) {
        //TODO: Implement a logging service
        console.log(message);
    }

    log(message: string) {
        this.print(`${styles.cyan.open + "[" + this.scope + "]" + styles.cyan.close}  ${message}`);    
    }

    error(message: string) {
        this.print(`${styles.red.open + "[" + this.scope + "]" + styles.red.close}  ${message}`);
    }

    warn(message: string) {
        this.print(`${styles.yellow.open + "[" + this.scope + "]" + styles.yellow.close}  ${message}`);
    }

    verbose(message: string) {
        this.print(`${styles.gray.open + "[" + this.scope + "]" + styles.gray.close}  ${message}`);
    }
}