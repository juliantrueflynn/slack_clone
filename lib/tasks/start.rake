task :start do
  exec 'foreman start -p 3000 -f Procfile.dev'
end