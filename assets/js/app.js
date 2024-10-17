var cl = console.log;

const blogForm = document.getElementById('blogForm');

const titleControl = document.getElementById('title');
const contentControl = document.getElementById('content');
const cardContainer =document.getElementById('cardContainer');

let blogArr = [  
    {
      title : "Es6",
      content : "ECMAScript 2015 is also known as ES6 and ECMAScript 6. This chapter describes the most important features of ES6.",
    },
    {
      title : "Anglular",
      content : "Angular is a TypeScript-based free and open-source single-page web application framework.",
    }
]

const snackBar = (msg, icon) => {
  Swal.fire({
      title: msg,
      icon : icon,
      timer:2500,
  })
}

const createBlogCards = (arr) => {
      let result = "";

      arr.forEach((blog) => {
        result += `
                  <div class="col-md-4">
                    <div class="card">
                      <div class="card-header">
                        <h2>${blog.title}</h2>
                      </div>
                      <div class="card-body">
                        <p>${blog.content}</p>
                      </div>
                      <div class="card-footer">
                        <button class="btn btn-sm btn-primary">Edit</button>
                        <button class="btn btn-sm btn-danger">Remove</button>
                      </div>
                    </div>
                  </div> `

           cardContainer.innerHTML = result;
      })

}

const fetchBlog = () => {
     return new Promise ((resolve, reject) => {
          setTimeout(() => {
            let success = Math.random() >= .5 ? true : false

            if(success){
              resolve(blogArr)
            }else{
              reject('Something went wrong while fecthing the all blog')
            }
   
          },1500)
     })
}

const createBlog = (blog) => {
    return new Promise ((resolve, reject) =>{
      setTimeout(() => {
         let success = Math.random() >= .5 ? true : false

         if(success){
          blogArr.push(blog);
          resolve('new Blog is created successfully !!!')
         }else{
          reject('Something went wrong while creating new Blog')
         }
      },1000)
    })
}

const onBlogAdd = (eve) => {
  eve.preventDefault();

  let blogObj = {
    title : titleControl.value,
    content : contentControl,
  }

  cl(blogObj);
  createBlog(blogObj)
      .then(msg => {
        snackBar(msg, "success")
        return fetchBlog()
      })
      .then(data => {
          cl(data)
          snackBar(`Blogs are fetched successfully !!`, "success") 
          createBlogCards(data); 
      })
      .catch(err => {
        snackBar(err, "error")
      })
}



blogForm.addEventListener('submit', onBlogAdd);