if [ -z "$BUMP" ]; then
  echo MUST PROVIDE VALID LERNA BUMP FOR VERSIONING
  return 1
else 
  lerna version patch && lerna run build && lerna publish from-git --yes --contents dist
  return 0
fi