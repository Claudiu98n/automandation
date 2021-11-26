echo "-------------------------------------------------"
echo "   Automandation Local Database  "
echo "-------------------------------------------------"
echo ""
echo ""


echo "📦 Create volume if it does not exist"
sudo mkdir -p /var/sadc/postgres-automandation

echo "🐳 Running Docker image as PostgresDB"
docker run --name sadc-automandation -p 5432:5432 -e POSTGRES_DB=strapi -e POSTGRES_USER=strapi -e POSTGRES_PASSWORD=strapi -v /var/sadc/postgres-automandation:/var/lib/postgresql/data -d postgres:9.6
