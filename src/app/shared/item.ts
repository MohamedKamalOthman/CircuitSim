export class Node{
    value!:string;
}
export class Item{
    id: string='';
    name: string='';
    startnode:Node={value:''};
    endnode:Node={value:''};
    value:string='';
    orientation:string='00000000';
    rotate:string='0';
    connection:boolean=false;
}