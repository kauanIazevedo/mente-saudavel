/* =========================================================
   ATENÇÃO: NÃO ALTERE ESTE ARQUIVO, POIS ELE É GERADO AUTOMATICAMENTE PELO SUPABASE.
   ATENÇÃO: NÃO COMPARILHE ESTE ARQUIVO PUBLICAMENTE, POIS ELE CONTÉM INFORMAÇÕES SENSÍVEIS COMO A CHAVE. 
========================================================= */
const supabaseUrl = "https://orppecfotrjozibrrfnr.supabase.co";
const supabaseKey = "sb_publishable_RY-0sI1UVqJgcKdZgvwzdg_t_JHNLUk";

// Captura o objeto global da CDN
const supabaseLib = window.supabase || (window.Supabase && window.Supabase.default);

if (supabaseLib && typeof supabaseLib.createClient === "function") {
    window.supabaseClient = supabaseLib.createClient(supabaseUrl, supabaseKey);
} else {
    window.supabaseClient = null;
    console.error("Erro: A biblioteca do Supabase não foi carregada pela CDN.");
}
