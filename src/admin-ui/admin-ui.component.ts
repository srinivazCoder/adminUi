import { Component, OnInit } from '@angular/core';
import { AdminUiService } from './admin-ui.service';

@Component({
  selector: 'app-admin-ui',
  templateUrl: './admin-ui.component.html',
  styleUrls: ['./admin-ui.component.css']
})
export class AdminUIComponent implements OnInit {
  dataCollection:any=[];
  totalDataCollection:any=[];
  pageNationData: any=[];
  searchInputValue :string= "";
  resultFilterSearch :any=[];
  getPagenationNum:number = 1;

  constructor(private getAdminUi : AdminUiService) { }

  ngOnInit(): void {
    this.getAdminUiFn();
  }

  getAdminUiFn(){
    this.getAdminUi.getAdminUiDetailes().subscribe((res:any)=>{
      console.log(res);
      res.forEach((el:any) => {
        el.isEdit = false;
        el.isChecked = false;
      });
      this.totalDataCollection = res;

      this.buildPagination(res.length);

     
      this.dataCollection = res.slice(0,10);
    })
  }

  loadPageFn(num:number){
    this.dataCollection = this.totalDataCollection.slice(num*10 - 10,num*10);
    this.getPagenationNum = num;
  }

  searchFilter(value:string){
    console.log(value)
    this.resultFilterSearch = this.totalDataCollection.filter((item:any)=> (item.name.includes(value) || item["id"].includes(value) || item.email.includes(value) || item.role.includes(value)));

    

    this.dataCollection = this.resultFilterSearch.slice(0,10);
    

    this.buildPagination(this.resultFilterSearch.length);

    if(value===""){
      this.dataCollection = this.totalDataCollection.slice(0,10);
      this.buildPagination(this.totalDataCollection.length);
    }
    this.getPagenationNum = 1
  }

  buildPagination(len:number){
    this.pageNationData = Array(Math.floor(len / 10) + 1).fill(0).map((e:any,i:any)=>i+1);
  }

  checkBtn(id:number){
    // let idx = this.dataCollection.findIndex((iteam:any)=>iteam.id == id);
    // console.log(this.dataCollection[idx].isChecked)
    // this.dataCollection[idx].isChecked = !this.dataCollection[idx].isChecked;
    // console.log(this.dataCollection[idx].isChecked)
  }

  deleteOne(id:number){
    // let idx = this.dataCollection.findIndex((val:any)=>val.id);
    this.dataCollection = this.dataCollection.filter((item:any)=>item.id !==id)
  }

  checkAllBtnPage(event:any){
    console.log(event.target.checked)
      this.dataCollection.forEach((item:any)=>{
        item.isChecked = event.target.checked
      })
    

    // event.target.checked = false
  }

  selectedDelete(){
    this.dataCollection = this.dataCollection.filter((e:any)=> (!e.isChecked));
  
  }

  pageChangerFun(n:number){
    this.loadPageFn(this.getPagenationNum + n)
  }
  isEditFun(id:number){
    // id = this.dataCollection.findIndex((e:any)=>e.id===id);
    this.dataCollection.forEach((e:any)=>{
      e.isEdit = false;
      if(e.id==id){
        e.isEdit = true;
      }
    })

  }

  updateFun(){
    this.dataCollection.forEach((data:any)=>{
      data.isEdit = false;
    })
  }
}
