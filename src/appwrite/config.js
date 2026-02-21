import conf from "../config/conf";
import { Client,TablesDB,Storage,Query ,ID} from "appwrite";  


export class Services{

    client=new Client()
    Databases
    bucket
    constructor(){

        this.client
        .setEndpoint(conf.appwriteURl)
        .setProject(conf.appwriteProjectId);

        const tablesDB=new TablesDB(this.client)
        const bucket =new Storage(this.client);

    }


    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.tablesDB.createRow (
                conf.appwriteTablesDbId,
                conf.appwriteTableID,
                slug || ID.unique(),
                {
                    title, 
                    content,
                    featuredImage, 
                    status,
                    userId
                }
            )
        } catch (error) {
             console.log("appwrite service :: createPost :: error",error);
        }
    }

    async updatePost(slug,{title,  content, featuredImage, status,}){
        try {
            return await this.tablesDB.updateRow(
                 conf.appwriteTablesDbId,
                conf.appwriteTableID,
                slug,
                {
                   title,  content, featuredImage, status, 
                }
            )
            
        } catch (error) {
            console.log("appwrite service :: updatePost :: error",error);
        }
    }
    async deletePost({slug}){
        try {
            return await this.tablesDB.deleteRow(
                 conf.appwriteTablesDbId,
                conf.appwriteTableID,
                slug,
            )
        } catch (error) {
            console.log("appwrite service :: deletePost :: error",error);
        }
    }
    async getPost({}){
        try {
            return await this.tablesDb.getRow(
                conf.appwriteTablesDbId,
                conf.appwriteTableID,
                slug,
            )
        } catch (error) {
            console.log("appwrite service :: getPost :: error",error);
        }
    }
//     async getPosts() {
//     try {
//         // Change listRow -> listRows and wrap arguments in an object {} (coz we made it look like key:value)
//         return await this.tablesDB.listRows({
//             databaseId: conf.appwriteTablesDbId,
//             tableId: conf.appwriteTableID,
//             queries: [
//                 Query.equal("status", "active")
//             ]
//         });
//     } catch (error) {
//         console.log("appwrite service :: getPosts :: error", error);
//         return false; // Good practice to return false or null on error
//     }
// }

    async getPosts(){
        try {
            return await this.tablesDB.listRows(
                conf.appwriteTablesDbId,
                conf.appwriteTableID,
                [
                    Query.equal("status","active")
                ]
            )
            
        } catch (error) {
            console.log("appwrite service :: getPosts :: error",error);
            return false;
        }

    }



//File upload services


    async fileUpload(file){
    try {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )} catch (error) {
        console.log("appwrite service :: fileUpload :: error",error);
                return false;
            }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            
        } catch (error) {
            console.log("appwrite service :: fileUpload :: error",error);
            return false;
        }
    }

    getPreview(fileId){
        try {

            //can directly return as well no need to wrap in try catch block
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
            
        } catch (error) {
             console.log("appwrite service :: getPreview :: error",error);
            return false;
        }

    }
}
const services=new Services();
export default services;