import mongoose , {Schema}  from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const todoSchema = new Schema({
    title:{
        type:String,
        required: [true, "Title is required"],
    },
    isCompleted:{
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
},{timestamps: true});

todoSchema.plugin(mongooseAggregatePaginate); 

export const Todo = mongoose.model("Todo", todoSchema);