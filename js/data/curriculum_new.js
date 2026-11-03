/*
 * これまで「勉強法の案内だけ」だった科目に、単元(本)をつける。
 * 単元そのものは units_new_*.js、本文は lessons_new_*.js(テキストを開いたときに読み込む)。
 */
(function () {
  var AREAS = {
    soc_hsogo: [
      { name: '近代化と私たち', units: ['hs_kindai', 'hs_kokumin', 'hs_kaikoku', 'hs_teikoku'], topics: ['産業革命と市民革命', '国民国家とナショナリズム', 'アジアの開港と明治維新', '帝国主義と日清・日露戦争'] },
      { name: '国際秩序の変化や大衆化と私たち', units: ['hs_ww1', 'hs_ww2'], topics: ['第一次世界大戦と大衆社会', '世界恐慌と第二次世界大戦'] },
      { name: 'グローバル化と私たち', units: ['hs_reisen', 'hs_global'], topics: ['冷戦と脱植民地化', 'グローバル化と現代の課題'] }
    ],
    soc_geo: [
      { name: '地図と地理的技能', units: ['gg_map'], topics: ['地図の図法・時差・GIS'] },
      { name: '自然環境', units: ['gg_climate', 'gg_landform'], topics: ['気候区分と生活', '大地形と小地形'] },
      { name: '産業と生活', units: ['gg_agri', 'gg_industry', 'gg_pop'], topics: ['農業と食料問題', '資源・エネルギーと工業', '人口・都市・村落'] },
      { name: '地誌と地域の課題', units: ['gg_region', 'gg_disaster'], topics: ['世界の諸地域', '防災と持続可能な地域づくり'] }
    ],
    soc_rinri: [
      { name: '人間としての在り方', units: ['ri_seinen'], topics: ['青年期と自己形成'] },
      { name: '源流思想', units: ['ri_greek', 'ri_religion', 'ri_china'], topics: ['古代ギリシアの思想', 'キリスト教・イスラーム・仏教', '儒家と道家'] },
      { name: '西洋近現代の思想', units: ['ri_west', 'ri_modern'], topics: ['経験論・合理論・カント・ヘーゲル', '功利主義・実存主義・現代の思想'] },
      { name: '日本の思想と現代の課題', units: ['ri_japan', 'ri_bio'], topics: ['日本の思想', '生命・環境・情報の倫理'] }
    ],
    sci_p4: [
      { name: '力学', units: ['p4_mech'], topics: ['運動量・円運動・単振動・万有引力'] },
      { name: '熱と気体', units: ['p4_heat'], topics: ['気体の状態方程式・気体分子運動論・熱力学'] },
      { name: '波動', units: ['p4_wave'], topics: ['ドップラー効果・光の干渉'] },
      { name: '電磁気', units: ['p4_elec', 'p4_mag'], topics: ['電場・電位・コンデンサー', '電流と磁場・電磁誘導・交流'] },
      { name: '原子', units: ['p4_atom'], topics: ['光電効果・原子模型・原子核'] }
    ],
    sci_c4: [
      { name: '理論化学', units: ['c4_state', 'c4_thermo', 'c4_rate', 'c4_redox'], topics: ['気体・溶液', '化学反応とエネルギー', '反応速度と化学平衡', '電池と電気分解'] },
      { name: '無機化学', units: ['c4_inorg'], topics: ['典型元素と遷移元素'] },
      { name: '有機化学', units: ['c4_org', 'c4_poly'], topics: ['有機化合物の構造と反応', '天然・合成高分子'] }
    ],
    sci_b4: [
      { name: '生命現象と物質', units: ['b4_cell', 'b4_meta', 'b4_gene'], topics: ['タンパク質と酵素', '呼吸と光合成', '遺伝子の発現と調節'] },
      { name: '生殖と発生', units: ['b4_dev'], topics: ['減数分裂・受精・発生'] },
      { name: '生物の環境応答', units: ['b4_resp', 'b4_plant'], topics: ['神経と行動', '植物の環境応答'] },
      { name: '生態と進化', units: ['b4_eco', 'b4_evo'], topics: ['個体群と生物群集', '進化のしくみと系統'] }
    ],
    sci_g4: [
      { name: '地球の概観と活動', units: ['g4_earth', 'g4_plate'], topics: ['地球の形と内部構造', 'プレート・地震・火山'] },
      { name: '地球の歴史', units: ['g4_history'], topics: ['地層・化石・地質年代'] },
      { name: '大気と海洋', units: ['g4_atmos'], topics: ['大気の構造と運動・海洋'] },
      { name: '宇宙', units: ['g4_space'], topics: ['太陽・恒星・銀河・宇宙の進化'] }
    ]
  };
  (WPS.CURRICULUM || []).forEach(function (g) {
    (g.courses || []).forEach(function (c) {
      if (!AREAS[c.id]) return;
      var ok = AREAS[c.id].map(function (a) { return { name: a.name, topics: a.topics, units: a.units.filter(function (id) { return WPS.UNIT_MAP && WPS.UNIT_MAP[id]; }) }; }).filter(function (a) { return a.units.length; });
      if (!ok.length) return;
      c.info = c.guide; delete c.guide; // 勉強法の案内は info に残す
      c.areas = ok;
    });
  });
})();
