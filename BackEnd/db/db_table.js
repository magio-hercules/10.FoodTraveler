module.exports = (function () {
    return {
      t_foods: {
        id: "`id`",
        description_id: "`description_id`",
        history_id: "`history_id`",
        food_type_list: "`food_type_list`",
        ingredient_list: "`ingredient_list`",
        allergy_list: "`allergy_list`",
        caution_list: "`caution_list`",
        direction_list: "`direction_list`",
        eat_list: "`eat_list`",
        city_list: "`city_list`",
      },
      
      // 참고용
      Config: {
        public_publisher: "labis@labis.com",
        auth: "1",
        non_auth: "0",
        favorite: "1",
        non_favorite: "0",
        default_chapter: "1"
      },
      
      Contents_my: { 
        id: "`id`",
        user_id: "`user_id`",
        score: "`score`",
        comment: "`comment`",
        chapter: "`chapter`",
        favorite: "`favorite`",
        time: "`time`"
      },
      Contents_list: { 
        id: "`id`",
        gen_id: "`gen_id`",
        season: "`season`",
        name: "`name`",
        name_org: "`name_org`",
        chapter_end: "`chapter_end`",
        theatrical: "`theatrical`",
        series_id: "`series_id`",
        summary: "`summary`",
        publisher: "`publisher`",
        auth: "`auth`",
        image: "`image`"
      },
    }
  })();