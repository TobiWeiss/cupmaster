export interface IBaseClass {
   clone(): IBaseClass;
   toObject(): Record<string, any>;
}
