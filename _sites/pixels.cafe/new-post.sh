# Set Directory Location
declare -x BUILD_PATH=$(pwd)
declare -x post=$(date +"%Y%m%dT%H%I%M")
read -p "Post Title: " title

declare -x filename=$(echo $title | sed -r 's/\ /-/g' | tr '[:upper:]' '[:lower:]')

touch $BUILD_PATH/content/posts/$post\_$filename.md;

echo "# $title" > $BUILD_PATH/content/posts/$post\_$filename.md;
echo "\n~ $post ~" >> $BUILD_PATH/content/posts/$post\_$filename.md;

