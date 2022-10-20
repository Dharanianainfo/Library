const bcryptjs = require('bcryptjs');
const userService = require('./users.services');
const User = require('./model/user.model');
// const Cart = require('./cart.model')
// const Product = require('./product_model');
const Category = require('./model/categories_model');
const Book = require('./model/book');
const Issue = require('./model/issue');
const Activity = require('./model/activity')
// const Order= require ('./order_model')


exports.studentRegister = (req, res, next) => {
    const { password } = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    userService.register(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.proRegister = (req, res, next) => {
    const { password } = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    userService.proRegister(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.adminRegister = (req, res, next) => {
    const { password } = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    userService.adminRegister(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

//profile API

exports.getFileUrl = async (req, res, next) => {
    try {
        if (!req.files || !req.files.length || !req.files[0].path) {
            throw new Error("not file is attached");
        }
        console.log(req.files, "files");

        req.file = req.files[0];

        let responseObj = req.file.filename;
        console.log(responseObj);
        return res.status(200).send({
            message: "Success",
            data: responseObj,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: "error",
        });
    }
};

exports.Profilepic_change = async (req, res, next) => {
    try {
        const admin = req.user.data1
        if (!req.files || !req.files.length || !req.files[0].path) {
            throw new Error("not file is attached");
        }

        req.file = req.files[0];

        let responseObj = req.file.filename;
        console.log(responseObj);

        findCri = {
            _id: admin,
        };

        //console.log(profile_pic)
        updateCri = {
            "image": responseObj,
        };
        console.log("response" + updateCri)

        let Details = await User.findOneAndUpdate(findCri, updateCri, {
            new: true,
        });

        msg = "Profile Picture Changed successfuly";
        let resData = responseObj;
        res.status(200).send({
            message: "Success",
            data: resData,
        });
    } catch (err) {
        console.log(err);
        seconsole.log(err);
        res.status(400).send({
            message: "error",
        });
    }
};

exports.profilePic = async (req, res, next) => {
    try {
        const admin = req.user.data1

        findCri = {
            _id: admin,
        };
        console.log(admin)
        let userDetails = await User.find(findCri).limit(1).exec();
        let resData = userDetails[0].image
        console.log("res===" + resData)
        //   console.log(userDetails[0].UserDetails.profile_pic)
        res.status(200).send({
            message: "Success",
            data: resData,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: "error",
        });
    }
};

exports.userLogin = (req, res, next) => {
    const { Idcard, password } = req.body;
    userService.userLogin({ Idcard, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.adminLogin = (req, res, next) => {
    const { Idcard, password } = req.body;
    userService.adminLogin({ Idcard, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.getoneUser = async (req, res, next) => {
    console.log("one");
    const admin = req.user.data2
    try {
        if (admin) {
            const { _id } = req.params
            const individualuser = await User.findOne({ _id: _id });

            res.status(200).json({ success: true, data: individualuser })
            console.log(_id)
        }
        else {
            console.log(admin)
            return res.status(401).json({ message: "Unauthoriesd User" });
        }
    } catch (err) {

        res.status(400).json({ success: false })

    }

}

exports.deleteUser = async (req, res, next) => {
    console.log("Delete")

    const { name } = req.body;
    const admin = req.user.data2

    try {
        const { _id } = req.params;
        if (admin) {
            const deletuser = await User.findOneAndDelete({ _id: _id })
            console.log(deletuser);
            res.status(201).json(deletuser);
        } else {
            console.log(admin)
            return res.status(401).json({ message: "Unauthoriesd User" });
        }
    } catch (error) {
        res.status(422).json(error);
    }

}

exports.updateUser = async (req, res, next) => {
    console.log("Update")


    const admin = req.user.data2

    try {
        const { _id } = req.params;
        if (admin) {
            const updateduser = await User.findByIdAndUpdate(_id, req.body, {
                new: true
            });
            console.log(updateduser);
            res.status(201).json(updateduser);
        } else {
            console.log(admin)
            return res.status(401).json({ message: "Unauthoriesd User" });
        }
    } catch (error) {
        res.status(422).json(error);
    }

}

exports.categorylist = (req, res, next) => {
    // console.log("ee");
    const { name } = req.body;
    const admin = req.user.data2
    if (admin) {
        userService.categorylist(req.body, (error, result) => {
            if (error) {
                return next(error);

            }
            return res.status(200).send({
                message: "Success",
                data: result,
            });
        });
    }
    else {
        console.log(admin)
        return res.status(401).json({ message: "Unauthoriesd User" });
    }
};

exports.subcategorylist = (req, res, next) => {
    // console.log("ee");
    const { name } = req.body;
    const admin = req.user.data2
    if (admin) {
        userService.subcategorylist(req.body, (error, result) => {
            if (error) {
                return next(error);

            }
            return res.status(200).send({
                message: "Success",
                data: result,
            });
        });
    }
    else {
        console.log(admin)
        return res.status(401).json({ message: "Unauthoriesd User" });
    }
};

exports.getAllbook = async (req, res, next) => {
    console.log("all");
    const admin = req.user.data2
    try {
        if (admin) {
            const product = await Book.find()
            console.log(product)
            res.json({ data: product })
        } else {
            console.log(admin)
            return res.status(401).json({ message: "Unauthoriesd User" });
        }
    } catch (error) {
        console.log("error")
        res.json(error)
    }
};

exports.deleteBook = async (req, res, next) => {
    console.log("Delete")

    const { name } = req.body;
    const admin = req.user.data2

    try {
        const { _id } = req.params;
        if (admin) {
            const deleteBook = await Book.findOneAndDelete({ _id: _id })
            console.log(deleteBook);
            res.status(201).json(deleteBook);
        } else {
            console.log(admin)
            return res.status(401).json({ message: "Unauthoriesd User" });
        }
    } catch (error) {
        res.status(422).json(error);
    }

}

exports.updateBook = async (req, res, next) => {
    console.log("Update")


    const admin = req.user.data2

    try {
        const { _id } = req.params;
        if (admin) {
            const updatedbook = await Book.findByIdAndUpdate(_id, req.body, {
                new: true
            });
            console.log(updatedbook);
            res.status(201).json(updatedbook);
        } else {
            console.log(admin)
            return res.status(401).json({ message: "Unauthoriesd User" });
        }
    } catch (error) {
        res.status(422).json(error);
    }

}

exports.getbyCategory = async (req, res, next) => {
    console.log("category1:" + req.query.Category);
    try {
        let category = req.query.Category
        console.log(category)

        const product = await Category.find({ genre: { $eq: category } })
        console.log(product)
        const product1 = await Book.find({ genre: { $eq: category } });
        console.log(product1)

        // // console.log(category+ "=>")
        // // console.log(req.query.Category)
        // console.log("category:" + category)

        // console.log(product1)

        return res.status(200).send(
            product1

        );
    } catch (error) {
        console.log("error")
        res.json(error)
    }
};

exports.getbysubCategory = async (req, res, next) => {
    console.log("category1:" + req.query.Category);
    try {
        let category = req.query.Category
        let subcategory = req.query.Scategory
        console.log("sub" + subcategory)

        const product = await Category.find({ genre: { $eq: category } })
        console.log(product)
        const product1 = await Book.find({ $and: [{ genre: { $eq: category } }, { Sname: { $eq: subcategory } }] });
        console.log(product1.length)

        // // console.log(category+ "=>")
        // // console.log(req.query.Category)
        // console.log("category:" + category)

        // console.log(product1)

        return res.status(200).send(
            product1

        );
    } catch (error) {
        console.log("error")
        res.json(error)
    }
};


exports.bookRegister = async (req, res, next) => {
    //const owner = req.user.data

    const title = req.body.title
    const bookId = req.body.bookId
    const stock = req.body.stock
    const author = req.body.author
    const description = req.body.description
    const Sname = req.body.Sname
    const genreid = req.body.genreid
    const genre = req.body.genre
    const code = req.body.code

    try {
        if (!req.files || !req.files.length || !req.files[0].path) {
            throw new Error("not file is attached");
        }
        req.file = req.files[0];
        let responseObj = req.file.filename;
        console.log(responseObj);

        var book = await Book.findOne({ bookId: bookId })
        if (!book) {
            console.log(req.file)
            const newBook = await Book.create({ code, image: responseObj, bookId, title, author, description, Sname, genreid, genre, stock });
            return res.status(201).send(newBook);;
        } else {
            const { _id } = book.bookId;
            console.log(req.file)
            const updateduser = await Book.findByIdAndUpdate(_id, { $inc: { 'stock': stock } }, {
                new: true
            });
            res.status(201).json(updateduser);
            console.log("item present")
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }

};
exports.getimageproduct = async (req, res) => {
    console.log(req.params);
    //const {_id} = req.params;
    console.log("all");
    try {
        var product = await Image.find()
        console.log(product[0]._id)
        res.json(product)
    } catch (error) {
        console.log("error")
        res.json(error)
    }
}
exports.postIssueBook = async (req, res, next) => {
    const user = await User.findById(req.user.data1);
    // console.log(user)
    // console.log("length  " + user.bookIssueInfo.length)
    // console.log(user.violationFlag)

    // if(!user.violationFlag) {
    //     req.flash("error", "You are flagged for violating rules/delay on returning books/paying fines. Untill the flag is lifted, You can't issue any books");
    //     return res.redirect("back");
    // }

    try {
        const _id = req.body._id
        console.log(_id)
        const book = await Book.findById(_id);
        console.log( "stock = " + book)

        // registering issue
        if (!user.violationFlag) {
            if (user.bookIssueInfo.length < 3) {
                
                if (book.stock > 0) {
                const issue = new Issue({
                    book_info: {
                        _id: book._id,
                        title: book.title,
                        author: book.author,
                        bookId: book.bookId,
                        genre: book.genre,
                        code: book.code,
                        Sname: book.Sname
                    },
                    user_id: {
                        _id: user._id,
                        username: user.username,
                    }
                });
                // putting issue record on individual user document
                const bookinfo = {
                    _id: book._id,
                    title: book.title,
                    author: book.author,
                    bookId: book.bookId,
                    genre: book.genre,
                    code: book.code
                }
                console.log("book in user" + bookinfo.author)
                user.bookIssueInfo.push(bookinfo);
                console.log("length  " + user.bookIssueInfo.length)
                await user.save();
                //   console.log(user)
                // logging the activity
                const activity = new Activity({
                    info: {
                        id: book._id,
                        title: book.title,
                    },
                    category: "Issue",
                    time: {
                        id: issue._id,
                        issueDate: issue.book_info.issueDate,
                        returnDate: issue.book_info.returnDate,
                    },
                    user_id: {
                        id: user._id,
                        username: user.username,
                    }
                });
                book.stock-=1

                // await ensure to synchronously save all database alteration
                await issue.save();
                await book.save();
                await activity.save();
                return res.status(200).send(issue);
            }else {
                return res.status(400).json({ message: "no book available" });
            }
            } else {
                return res.status(500).json({ message: "You can't issue more than 3 books at a time" });
            }
        } else {
            return res.status(600).json({ message: "You are flagged for violating rules/delay on returning books/paying fines. Untill the flag is lifted, You can't issue any books" });
        }
    } catch (err) {
        console.log(err);

    }
}

exports.getShowRenewReturn = async(req, res, next) => {
    const user_id = req.user.data1;
    console.log(user_id)
    try {
        const issue = await Issue.find();
        return res.status(200).send(issue);
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}

exports.postRenewBook = async(req, res, next) => {
    try {
        const bookid = req.body._id
        const userid = req.user.data1
        const searchObj = {
            "user_id._id": req.user.data1,
            "book_info._id": bookid,
        } 
        console.log(searchObj)
        console.log(bookid)
        const user = await User.findById({_id:userid})
        const book = await Book.findById({_id:bookid})
        const issue = await Issue.findOne(searchObj);
        // adding extra 7 days to that issue
        let time = issue.book_info.returnDate.getTime();
        issue.book_info.returnDate = time + 7*24*60*60*1000;
        issue.book_info.isRenewed = true;
        issue.book_info.author = book.author;
        issue.book_info.code = book.code;
        issue.book_info.genre = book.genre;
        issue.book_info.Sname = book.Sname;
        // logging the activity
        const activity = new Activity({
            info: {
                id: issue._id,
                title: issue.book_info.title,
                bookId:issue.book_info.bookId
            },
            category: "Renew",
            time: {
                id: issue._id,
                issueDate: issue.book_info.issueDate,
                returnDate: issue.book_info.returnDate,
            },
            user_id: {
                _id: user.data1,
                username: user.username,
                Idcard:user.Idcard
            }
        });

        await activity.save();
        await issue.save();

        return res.status(200).json(activity)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
        
    }
}

exports.postReturnBook = async(req, res, next) => {
    try {
        // finding the position
        const bookid = req.params._id
        const userid = req.user.data1
        const user = await User.findById(userid);
        const pos = user.bookIssueInfo.findIndex((item) => item._id == bookid);
        console.log(bookid)
        console.log(user.bookIssueInfo.length+"  "+pos)
        if(pos>=0){
        // fetching book from db and increament
        const book = await Book.findById(bookid);
        book.stock += 1;
        await book.save();

        // removing issue 
        const issue =  await Issue.findOne({"user_id.id": userid});
        await issue.remove();

        // popping book issue info from user
       
        user.bookIssueInfo.splice(pos, 1);
        await user.save();

        // logging the activity
        const activity = new Activity({
            info: {
                id: issue.book_info.id,
                title: issue.book_info.title,
            },
            category: "Return",
            time: {
                id: issue._id,
                issueDate: issue.book_info.issueDate,
                returnDate: issue.book_info.returnDate,
            },
            user_id: {
                _id: user._id,
                username: user.username,
            }
        });
        await activity.save();
        // redirecting
        return res.status(200).json(activity)
    }else{
        return res.status(400).json("no book")
    }
    } catch(err) {
        console.log(err);
        return res.status(500).json(err)
    }
}

exports.getFlagUser = async (req, res, next) => {
    try {
        const userid = req.params._id;

        const user = await User.findById(userid);
        console.log(user.violationFlag)
        if(user.violationFlag) {
            user.violationFlag = true;
            await user.save();
            return res.status(200).json({user,message:"flagged"})
        } else {
            user.violationFlag = false;
            await user.save();
            return res.status(200).json({user,message:"unflagged"})
        }

        return res.status(200).json(user)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
};
