import React from 'react'

const Newsitem = (props)=> {
        let {title, description, imageUrl, newsUrl, author, date, source} = props;
        return (

          <div className="my-3">
          <div className="card" style={{width:"18rem"}}>
              <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0', backgroundColor:'transparent'}}>
               <span className=" badge  rounded-pill bg danger" >{source}</span>
               </div>
          <img src={!imageUrl?"https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg":imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}..</h5>
                     <p className="card-text">{description}</p>
                     <p className="card-text"><small className="text-muted">by {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                     <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read more</a>
                </div>
        </div>
        </div>
      
                
        )
    
}

export default Newsitem
