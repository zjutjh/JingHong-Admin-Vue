declare namespace SuitApplyAPI {
  interface SuitCheckItem {
    id: number;
    name: string;
    student_id: string;
    gender: string;
    college: string;
    dormitory: string;
    contact: string;
    supplies_id: number;
    supplies_name: string;
    kind: string;
    spec: string;
    count: number;
    apply_time: string;
    borrow_time: string;
    return_time: string;
    status: number;
  }
  
  interface SuitSpec {
    id: number;
    stock: number;
    spec: string;
    borrowed: number;
  }
  interface SuitItem {
    name: string;
    img: string;
    campus: number;
    totalStock?: number;
    totalBorrowed?: number;
    specs: SuitSpec[];
  }
  interface publishForm {
    name: string;
    campus: number;
    img: string;
    specs: { stock: number; spec: string;}[];
  }
}