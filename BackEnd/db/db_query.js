module.exports = function () {
    return {
        /////////
        // GET //
        /////////
        getTotalFoods: function () {
            // .../total_foods
            // return 'SELECT * FROM t_foods';
            return 'SELECT * FROM t_foods JOIN d_description USING(description_id) order by id asc';
        },
        getTotalStores: function () {
            // .../total_stores
            return 'SELECT * FROM t_stores order by id asc';
        },


        //////////
        // POST //
        //////////

        // food //
        postFood: function () {
            // .../food (id)
           return 'SELECT * FROM t_foods';
        },

        postDescription: function () {
            // .../description (id)
           return 'SELECT * FROM d_description';
        },


        // stores //
        postStore: function () {
           // .../caution (id)
           return 'SELECT * FROM t_stores';
        },


        // information //
        // ingredient
        postIngredient: function () {
            // .../ingredient (id)
           return 'SELECT * FROM d_ingredient';
        },


        // cook
        postCook: function () {
            // .../cook (id)
           return 'SELECT * FROM d_cook';
        },


        // eat
        postEat: function () {
            // .../eat (id)
           return 'SELECT * FROM d_eat';
        },


        // history
        postHistory: function () {
            // .../history (id)
           return 'SELECT * FROM d_history';
        },


        // caution
        postCaution: function () {
            // .../caution (id)
           return 'SELECT * FROM d_caution';
        },


      

        // contents
        postTotalContents: function () {
            // .../MyCL/total_contents (user_id)
            return 'SELECT * FROM Contents_list';
        },
        postTotalNewContents: function () {
            // .../MyCL/total_new_contents (user_id)
            return 'SELECT * FROM Contents_list';
        },
        postMyContents: function () {
            // .../MyCL/my_contents (user_id)
            return 'SELECT * FROM Contents_my JOIN Contents_list USING(id)';
        },
        postInsertMyContents: function () {
            // .../MyCL/insert_my_contents (user_id,id_list:[id])
            return 'INSERT INTO Contents_my (user_id, id, chapter) VALUES ';
        },
        postInsertMyNewContents: function () {
            // .../MyCL/insert_my_new_contents (user_id,id_list:[id])
            return 'INSERT INTO Contents_my SET ';
        },
        postUpdateMyContents: function () {
            // .../MyCL/update_my_contents (id,user_id,score,comment,chapter,favorite)
            return 'UPDATE Contents_my SET ';
        },
        postFilterMyContents: function () {
            // .../MyCL/filter_my_contents (user_id,gen_id)
            return 'SELECT * FROM Contents_my JOIN Contents_list USING(id)';
        },
        postInsertContentsList: function () {
            // .../MyCL/insert_contents_list (gen_id,season,name,name_org,chapter_end,theatrical,series_id,summary,publisher,auth,image)
            return 'INSERT INTO Contents_list SET ';
        },
        // postInsertMyContents: function () {
        //     // .../MyCL/insert_contents_list (id,user_id,score,comment,chapter)
        //     return 'INSERT INTO Contents_my SET';
        // },
        postFilterContentsList: function () {
            // .../MyCL/filter_contents_list (gen_id)
            return 'SELECT * FROM Contents_list';
        },
        postNonAuthContentsList: function () {
            // .../MyCL/non_auth_contents_list (user_id)
            return 'SELECT * FROM Contents_list';
        },
        postSetAuthContents: function () {
            // .../MyCL/set_auth_contents_list (user_id,id_list:[id])
            return 'UPDATE Contents_list SET ';
        },
        postDeleteMyContents: function () {
            // .../MyCL/delete_my_contents (user_id,id_list:[id])
            return 'DELETE FROM Contents_my';
        },
        postUpdateContentsImage: function () {
            // .../MyCL/update_contents_image (id, url)
            return 'UPDATE Contents_list SET ';
        },
        postSearchContentsList: function () {
            // .../MyCL/search_contents_list (name)
            return 'SELECT * FROM Contents_list ';
        },
        postSearchMyContents: function () {
            // .../MyCL/search_my_contents (user_id,name)
            return 'SELECT * FROM Contents_my JOIN Contents_list USING(id) ';
        }
    }
};
