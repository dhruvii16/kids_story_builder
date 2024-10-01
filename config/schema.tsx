import { json, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const storyData=pgTable('storyData',{
    id:serial('id').primaryKey(),
    storyId:varchar('storyId'),
    storySubject:text('storySubject'),
    storyType:varchar('storyType'),
    ageGroup:varchar('ageGroup'),
    imageStyle:varchar('imageStyle'),
    output:json('output'),
    coverImage:varchar('coverImage')
})

export const users=pgTable('users',{
    id:serial('id').primaryKey(),
    userName:varchar('userName'),
    userEmail:varchar('userEmail'),
    userImage:text('userImage'),
    credits:varchar('credits'),
})