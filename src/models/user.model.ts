import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
   email: string,
   name: string,
   password: string,
   createdAt: Date,
   updatedAt: Date,
   comparePassword(candidatePassword: string): Promise<Boolean>;
}

const UserSchema = new mongoose.Schema(
    {
      email: { type: String, required: true, unique: true, default: null },
      name: { type: String, required: true, default: null },
      password: { type: String, required: true, default: null },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function(next) {
      const user = this as UserDocument; 

      if(!user.isModified("password"))
      return next();

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;

      return next();
});

UserSchema.methods.comparePassword = async function(candidatePassword: string) {
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch(e => false);
}

const User = mongoose.model<UserDocument>("users", UserSchema);
export default User;