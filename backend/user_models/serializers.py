from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name','email','pw']
        extra_kwargs = {
            'pw': {'write_only' : True}
        }

    def create(self, validated_data):
        pw = validated_data.pop('pw',None)
        instance = self.Meta.model(**validated_data)

        if pw is not None:
            instance.set_password(pw)
            #암호화되어 password에 저장.

        instance.save()
        return instance
