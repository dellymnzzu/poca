const {ObjectId, Timestamp} = require('mongodb');
const MongoCilent = require("mongodb").MongoClient; // mongo db

var db;

MongoCilent.connect("mongodb+srv://"+ process.env.DB_ID+":"+process.env.DB_PW+"@cluster0.7igrfxz.mongodb.net/poca?retryWrites=true&w=majority",(error, client) => {
  if (error) return console.log("mongodb= "+error);
  console.log("몽고디비연결");
  db = client.db("poca");
  
  
})
      module.exports = {

      //find
      contentFindMiddle: (input)=>{
        return new Promise((resolve, reject)=>{
      
           let sort_ = null;
           let find_ = null;
        
           switch(input){
        
              case "new" :
                 sort_= {시간 :-1} ;
                 find_=  {};
                 break;
              case "best" :
                 sort_= {조회수 : -1} ;
                 find_= {} ;
                 break;
              case "bestLike" :
                 sort_= {좋아요 : -1} ;
                 find_= {} ;
                 break;
              default:
                 sort_= {시간 : -1} ;
                 find_= {middle:input};
              
              }
        
          db.collection("content").find(find_).sort(sort_).toArray((error,result)=>{
              resolve(result);
              reject( new Error(error) );
           })
        })
      
      },
     
    contentFind: function(like){
      return new Promise((resolve,reject)=>{

        if(!like) like=null;
        db.collection("content")
        .find(like)
        .sort({ 시간: -1 })
        .toArray((error, result) => { 
          resolve(result);
        
          reject(new Error(error))
        }); 
      })
  },
  PostFind: function(currentPage,limit){
    return new Promise((resolve,reject)=>{
      db.collection("post").find().sort({ 시간: -1 }).skip((currentPage-1)*limit).limit(limit).toArray((error,result)=>{
        resolve(result);
        
        reject(new Error(error));
      })
    })
  },
  commentFind: function(data){
    return new Promise((resolve,reject)=>{
      db.collection("comment").find(data).sort({ 시간: -1 }).toArray((error,result)=>{
        resolve(result);
        
        reject(new Error(error));
      })
    })
  },
  chatroomFind: function(data){
    return new Promise((resolve,reject)=>{
      db.collection("chatroom").find(data).toArray((error,result)=>{
        resolve(result);
      
        reject(new Error(error));
      })
      });
  },
  //findOne
  contentFindOne: function(ID){
    return new Promise((resolve,reject)=>{
      db.collection("content").findOne({_id:ID},(error,result)=>{
     
        
        resolve(result);
        
        reject(new Error(error))
        
      });
    })
  },
  counterFindOne: function(data){
    return new Promise((resolve,reject)=>{
      db.collection("counter").findOne(data,(error,result)=>{
        resolve(result);
      
        reject(error);
      })
      });
},
PostFindOne: function(data){
  return new Promise((resolve,reject)=>{
    db.collection("post").findOne(data,(error,result)=>{
      resolve(result);
    
      reject(new Error(error));
    })
    });
},
        loginfindOne: function(ID){
          return new Promise((resolve,reject)=>{
            db.collection("login").findOne(ID,(error,result)=>{
              console.log(ID);
              resolve(result);

              reject(new Error("UserData error"));
          })
        })
        },
        ScamFindOne: function(data){
          return new Promise((resolve,reject)=>{
            db.collection("scam").findOne({input:data},(error,result)=>{
              resolve(result);
            
              reject(new Error(error));
            })
            });
        },
        likeFindOne: function(data,like_id){
          return new Promise((resolve,reject)=>{
            if(!like_id) {like_id ==null;}
            db.collection("like").findOne(data,like_id,(error,result)=>{
              resolve(result);
            
              reject(new Error(error));
            })
            });
        },
        chatroomFindOne: function(data){
          return new Promise((resolve,reject)=>{
            db.collection("chatroom").findOne(data,(error,result)=>{
              resolve(result);
            
              reject(new Error(error));
            })
            });
        },
        //insertOne
        inputUserData: function(body){
            return new Promise((resolve,reject)=>{
                let id =String(body.id);
                let pw=String(body.pw);
                let name=String(body.name);
                let Email = String(body.Email);
                
                db.collection("login").insertOne({
                  id:id,
                  pw:pw,
                  name:name,
                  Email:Email,
                },(error,result)=>{
                    resolve(result);
                    reject(new Error("inputUserData error"))
                    
                });
            });
        },
        contentInsertOne:function(save){
          return new Promise((resolve,reject)=>{
    
            db.collection("content").insertOne(save,(error,result)=>{
              resolve(result);
              reject(new Error(error));
            })
      
          })
        },
        postInsertOne: function(data){
          return new Promise((resolve,reject)=>{
            db.collection("post").insertOne(data, (error, result) => {
              resolve(result);
              
              reject(new Error(error));
            })
          })
        },
        commentInsertOne: function(data){
          return new Promise((resolve,reject)=>{
            db.collection("comment").insertOne(data, (error, result) => {
              resolve(result);
              
              reject(new Error(error));
            })
          })
        }, 
        ScamInsertOne: function(data){
          return new Promise((resolve,reject)=>{
            db.collection("scam").insertOne(data, (error, result) => {
              resolve(result);
              
              reject(new Error(error));
            })
          })
        },
        likeInsertOne: function(data){
          return new Promise((resolve,reject)=>{
            db.collection("like").insertOne(data,(error,result)=>{
              resolve(result);
            
              reject(new Error(error));
            })
            });
        },
        
        
        chatroomInsertOne: function(data){
          return new Promise((resolve,reject)=>{
            db.collection("chatroom").insertOne(data,(error,result)=>{
              resolve(result);
            
              reject(new Error(error));
            })
            });
        },

      LoginUpdate: function(UserID,name,Email,id,pw){
          return new Promise((resolve,reject)=>{
            db.collection("login").updateOne({_id:UserID},{$set:{name : name, Email : Email, id: id, pw: pw }},(error,result)=>{
              console.log(name);
              resolve(result);
            
              reject(error);

            })
          });
      },
      contentUpdate :(input_id,UserID,PM)=>{   //P 또는 M이라는 값을 사용
        return new Promise((resolve,reject)=>{
          let tntlr = null;
          let likeLogic = 0;
          let data= UserID;
      
          if(PM == 'P'){
         db.collection("content").updateOne({_id :input_id},{$addToSet:{likeid:data}, $inc: { 좋아요: 1 } },(error,result)=>{
          console.log(result);
          resolve(result);
          reject(new Error("on error"));
         })
        }
          else if(PM == 'M'){
            db.collection("content").updateOne({_id :input_id},{$pull:{likeid:data}, $inc: { 좋아요: -1 } },(error,result)=>{
              console.log(result);
              resolve(result);
              reject(new Error("on error"));
             })
          }
        })
      },
      contentUpdatePoca : function(input_id){
      return new Promise((resolve,reject)=>{
      db.collection("content").updateOne({_id:input_id},{$inc:{조회수:1}},(error,result)=>{
      resolve(result);  
      reject(new Error("on error"));
          })
        })
      },
      
    
    
  counterUpdateOne: function(counting){
    return new Promise((resolve,reject)=>{
      let Title =null;
      let NumTitle=null;
      if(counting =="totalNumber") {
        Title = { contentName: counting};
        NumTitle = { $inc: { totalContent: 1 } };
      }
      if(counting =="총게시물갯수"){
        Title = { name: counting};
        NumTitle = { $inc: { totalPost: 1 }}
      }
      db.collection("counter").updateOne(Title,NumTitle,(error,result)=>{
        resolve(result);
      
        reject(error);
      })
      });

  },
  chatroomUpdateOne: function(Data,Username,data){
    return new Promise((resolve,reject)=>{
      db.collection("chatroom").updateOne({ id: Data},
      {
        $push: { chat: { UserId: Username, contents: data, date: new Date() } },
      },{ upsert: true },(error,result)=>{
        resolve(result);
      
        reject(error);
      })
      });
  },
  postUpdateOne: function(Id,title,data){
    return new Promise((resolve,reject)=>{
      db.collection("post").updateOne({_id:Id},{$set:{제목 : title, 내용 : data }},(error,result)=>{
        console.log(result);
        resolve(result);
      
        reject(error);

      })
    });
},

  

PostAggregate: function(data){
  return new Promise((resolve,reject)=>{
    db.collection("post").aggregate(data).toArray((error,result)=>{
      resolve(result);
    
      reject(new Error(error));

    })
    })
},




likeDeleteOne: function(data){
  return new Promise((resolve,reject)=>{
    db.collection("like").deleteOne(data,(error,result)=>{
      resolve(result);
    
      reject(error);
    })
    });
},
postDeleteOne: function(data){
  return new Promise((resolve,reject)=>{
    db.collection("post").deleteOne(data,(error,result)=>{
      resolve(result);

      reject(error);
    })
  })
},
LoginDeleteOne: function(data){
  return new Promise((resolve,reject)=>{
    db.collection("login").deleteOne(data,(error,result)=>{
      resolve(result);

      reject(error);
    })
  })
}





    };



