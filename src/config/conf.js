const conf={
    appwriteURl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteTablesDbId:String(import.meta.env.VITE_APPWRITE_TABLESDB_ID),
    appwriteTableID:String(import.meta.env.VITE_APPWRITE_TABLE_ID),
    appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

//best practice


export default conf