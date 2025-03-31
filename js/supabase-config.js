// Configuração do Supabase
// ⚠️ ATENÇÃO: Em um ambiente de produção, não exponha suas chaves diretamente no front-end.
// Para maior segurança, considere usar variáveis de ambiente ou um servidor intermediário.

// URL do seu projeto Supabase (substitua pelo seu URL)
const SUPABASE_URL = 'https://uwstpoyeniazwxbdqvrw.supabase.co';

// Chave anônima pública do seu projeto (substitua pela sua chave)
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3c3Rwb3llbmlhend4YmRxdnJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MzI0MzcsImV4cCI6MjA1OTAwODQzN30.nGSfGgGtOv29oqxcPpEDB6u_G_2QFbTpmApLMsn_rmU';

// Criar e exportar o cliente do Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY); 