import React from 'react'
import avatar from "../../Images/avatar.jpg"
import "./clientsmodal.css";
import Paper from '@material-ui/core/Paper';

class Clientsmodal extends React.Component{
    state={
        storage:[{
            training_category:"Training",
            training:"Fitness",
            cost:"1400(kwd)",
            session:24 ,
            description:"Fast  Track Weight Loss,Rapid Muscle Gain,Fittness Combo,Personal Training"
        },
        {
            training_category:"Training",
            training:"Medical",
            cost:"1200(kwd)",
            session:12 ,
            description:"Fast  Track Weight Loss,Rapid Muscle Gain,Fittness Combo,Personal Training"
        },
        {
            training_category:"Training",
            training:"Fitness",
            cost:"1200(kwd)",
            session:12 ,
            description:"Fast  Track Weight Loss,Rapid Muscle Gain,Fittness Combo,Personal Training"
        },
    ],
    }

   render(){
       return(
           <>
        <div className="first_half">
            <div>
                <img src={avatar} style={{height:"150px"}}/>
            </div>
            <div className="full_content" >
                <span className="contents_editing"><b style={{fontWeight:"bold",color:"black"}}>AAMINA</b></span>
                <span className="contents_editing">29 Years / Female </span>
                <span className="contents_editing">Jabriya<span className="jabriya_edit" >...</span></span>
                <span className="contents_editing">9952666754</span>
                <span className="contents_editing">
                <span className="watchreport_edit">Watch Report</span></span>
            </div>
        </div>
            <div className="package_head">
                <div className="packagehistory_edit">PACKAGE HISTORY</div>
            </div>
      
        
        <Paper className="paperedit">
            <div className="store_edit">
           { this.state.storage.map((val) => (
             
                <div>
                <div className="second_half">

                <div className="card card_edit" >
                    <div className="button_edit">6 Pack Abs</div>
                       <div className="content_parent">
                   
                           <div className="trianing_category_edit">
                               <span className="inside_contents">Training Category</span>
                               <span className="inside_contents">Training</span>
                           </div>
       
                           <div className="trianing_category_edit">
                                <span className="inside_contents_top">{val.training_category}</span>
                                <span className="inside_contents_top">{val.training}</span>
                           </div>
       
                           <div className="trianing_category_edit">
                               <span className="inside_contents">Cost(KWD)</span>
                               <span className="inside_contents">Session</span>
                           </div>
       
                           <div className="trianing_category_edit">
                               <span className="inside_contents_top">{val.cost}</span>
                               <span className="inside_contents_top">{val.session}</span>
                           </div>
                       </div>
                       <div className="border_edit"></div>
                       <span className="fasttrack_edit">{val.description}</span>
               </div> 
           </div>
           </div>
            ))
            
        }
        </div>
        </Paper>
        
        </>
        
       )
   }
}
export default Clientsmodal;
